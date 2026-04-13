"use server"

import connectDb from "@/db/connectDb"
import Payment from "@/models/Payment"
import User from "@/models/User"
import Razorpay from "razorpay"


export const initiate = async (amount, username, paymentform) => {
    await connectDb()

    let user = await User.findOne({ username: username }).lean()
    console.log("User found:", user)
    let instance = new Razorpay({
        key_id: user.razorpayid,
        key_secret: user.razorpaysecret,
    })
    const x = await instance.orders.create({
        amount: Number.parseInt(amount),
        currency: "INR",
    })
    await Payment.create({ oid: x.id, to_user: username, amount: amount / 100, message: paymentform.message, name: paymentform.name })
    return x
}

export const fetchuser = async (username) => {
    await connectDb()
    console.log(username)
    let u = await User.findOne({ username }).lean()
    return u ? JSON.parse(JSON.stringify(u)) : null
}

export const fetchpayments = async (username) => {
    await connectDb()
    // find all payments sorted by decreasing order of amount and flatten object ids
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()
    return JSON.parse(JSON.stringify(p))
}



export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let newdata = data
    // If the username is being updated, check if username is available
    if (oldusername !== newdata.username) {
        let u = await User.findOne({ username: newdata.username })
        if (u) {
            return { error: "Username already exists" }
        }
        await User.updateOne({ email: newdata.email }, newdata)
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({ to_user: oldusername }, { to_user: newdata.username })
        console.log("Profile updated successfully")
    }
    else {
        await User.updateOne({ email: newdata.email }, newdata)
    }


}