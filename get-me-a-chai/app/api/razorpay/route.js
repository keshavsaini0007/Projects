import connectDB from "@/db/connectDb";
import Payment from "@/models/Payment"
import { NextResponse } from "next/server"
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils"
import User from "@/models/User";


export async function POST(request) {
    await connectDB()
    let body = await request.formData()
    body = Object.fromEntries(body)

    let x = await Payment.findOne({oid : body.razorpay_order_id})
    let user = await User.findOne({username : x.to_user})

    if(!x){
        return NextResponse.json({error : "Payment not found"}, {status : 404})
    }


    let xx = validatePaymentVerification(
        {"order_id" : body.razorpay_order_id,
        "payment_id" : body.razorpay_payment_id}
        , body.razorpay_signature, user.razorpaysecret
    )

    if(xx){
        let updatedPayment = await Payment.findOneAndUpdate({oid : body.razorpay_order_id}, {done : true}, {new : true})
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentDone=success`)
    }
    else{
        return NextResponse.json({error : "Payment verification failed"}, {status : 400})
    }
}