# Razorpay Payment Integration - Implementation Guide

## Overview

This document outlines the complete implementation process for integrating Razorpay payment gateway into the Get-Me-A-Chai application (Patreon clone built with Next.js).

---

## Prerequisites

1. **Razorpay Account**: Sign up at [dashboard.razorpay.com](https://dashboard.razorpay.com)
2. **Node.js Project**: Next.js application with App Router
3. **MongoDB Database**: For storing user and payment records
4. **Environment Setup**: `.env.local` file configured

---

## Installation Steps

### 1. Install Razorpay SDK

```bash
npm install razorpay
```

### 2. Configure Environment Variables

Create/update `.env.local` with:

```env
NEXT_PUBLIC_KEY_ID=rzp_test_xxxxxxxxxxxxx   # Public key (used in frontend)
KEY_SECRET=xxxxxxxxxxxxxxxxxxxx             # Secret key (server-side only)
NEXT_PUBLIC_URL=http://localhost:3000       # Application URL
```

**Important**: Never expose `KEY_SECRET` to the frontend. Use environment variables that start with `NEXT_PUBLIC_` only for client-safe values.

---

## Implementation Steps

### Step 1: Create Payment Model

**File**: `models/Payment.js`

```javascript
import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    to_user: { type: String, required: true },
    oid: { type: String, required: true },
    message: { type: String },
    amount: { type: Number, required: true },
    done: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Payment || model("Payment", PaymentSchema);
```

**Purpose**: Stores payment records with a `done` flag to track payment status.

### Step 2: Update User Model (Optional)

**File**: `models/User.js`

Add Razorpay credentials storage for creators:

```javascript
razorpayid: { type: String },
razorpaysecret: { type: String },
```

### Step 3: Create Server Action for Order Creation

**File**: `actions/useractions.js`

```javascript
"use server"

import connectDb from "@/db/connectDb"
import Payment from "@/models/Payment"
import Razorpay from "razorpay"

export const initiate = async (amount, username, paymentform) => {
    await connectDb()
    
    let instance = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_KEY_ID,
        key_secret: process.env.KEY_SECRET,
    })
    
    // Create order with Razorpay
    const order = await instance.orders.create({
        amount: Number.parseInt(amount),
        currency: "INR",
    })
    
    // Save pending payment to database
    await Payment.create({
        oid: order.id,
        to_user: username,
        amount: amount,
        message: paymentform.message,
        name: paymentform.name
    })
    
    return order
}
```

**Purpose**: 
- Creates order on Razorpay server
- Stores pending payment in MongoDB
- Returns order details to frontend

### Step 4: Create Payment Page Component

**File**: `components/PaymentPage.js`

```javascript
"use client"
import Script from "next/script"
import { useState, useEffect } from "react"
import { initiate } from "@/actions/useractions"

const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({})
    
    const pay = async (amount) => {
        // Call server action to create order
        const order = await initiate(amount, username, paymentform)
        
        // Configure Razorpay checkout
        var options = {
            key: process.env.NEXT_PUBLIC_KEY_ID,
            amount: amount,
            currency: "INR",
            name: "Get Me A Chai",
            order_id: order.id,
            callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            prefill: {
                name: paymentform.name,
                email: paymentform.email,
                contact: paymentform.phone
            }
        }
        
        var rzp1 = new Razorpay(options)
        rzp1.open()
    }
    
    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            
            {/* Payment Form UI */}
            <form onSubmit={(e) => { e.preventDefault(); pay(amount * 100) }}>
                <input name="name" onChange={handleChange} placeholder="Name" />
                <input name="amount" onChange={handleChange} placeholder="Amount" />
                <button type="submit">Pay</button>
            </form>
        </>
    )
}
```

### Step 5: Create Callback API Route

**File**: `app/api/razorpay/route.js`

```javascript
import connectDB from "@/db/connectDb"
import Payment from "@/models/Payment"
import { NextResponse } from "next/server"
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils"

export async function POST(request) {
    await connectDB()
    let body = await request.formData()
    body = Object.fromEntries(body)
    
    // Find the pending payment
    let payment = await Payment.findOne({ oid: body.razorpay_order_id })
    
    if (!payment) {
        return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }
    
    // Verify payment signature
    let isValid = validatePaymentVerification(
        {
            order_id: body.razorpay_order_id,
            payment_id: body.razorpay_payment_id
        },
        body.razorpay_signature,
        process.env.KEY_SECRET
    )
    
    if (isValid) {
        // Update payment status to completed
        await Payment.findOneAndUpdate(
            { oid: body.razorpay_order_id },
            { done: true }
        )
        
        // Redirect back to profile with success message
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_URL}/${payment.to_user}?paymentDone=success`,
            { status: 302 }
        )
    } else {
        return NextResponse.json(
            { error: "Payment verification failed" },
            { status: 400 }
        )
    }
}
```

---

## Payment Flow

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Frontend   │      │  Server      │      │  Razorpay    │
│   (User)     │      │  Action      │      │  Server      │
└──────┬───────┘      └──────┬───────┘      └──────┬───────┘
       │                     │                     │
       │  1. Click Pay       │                     │
       │────────────────────>│                     │
       │                     │  2. Create Order    │
       │                     │────────────────────>│
       │                     │                     │
       │                     │  3. Return Order ID │
       │  4. Order ID        │<────────────────────│
       │<────────────────────│                     │
       │                     │                     │
       │  5. Open Checkout   │                     │
       │────────────────────>│                     │
       │                     │  6. User Pays       │
       │                     │                     │
       │  7. Redirect to     │                     │
       │  /api/razorpay      │                     │
       │────────────────────>│                     │
       │                     │                     │
       │                     │  8. Verify Signature │
       │                     │────────────────────>│
       │                     │                     │
       │                     │  9. Update DB       │
       │                     │       (done: true)  │
       │                     │                     │
       │  10. Redirect to    │                     │
       │  Profile Page       │                     │
       │<────────────────────│                     │
```

---

## Database Schema

### Payment Collection

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Auto-generated unique ID |
| `oid` | String | Razorpay Order ID |
| `to_user` | String | Creator's username |
| `amount` | Number | Payment amount (in paise) |
| `name` | String | Supporter's name |
| `message` | String | Support message |
| `done` | Boolean | Payment completion status |
| `createdAt` | Date | Record creation timestamp |

---

## Key Security Points

1. **Signature Verification**: Always verify `razorpay_signature` using `validatePaymentVerification()`
2. **Server-Side Secret**: Keep `KEY_SECRET` on server only
3. **Order ID Tracking**: Match `razorpay_order_id` with database record
4. **Idempotency**: Check if payment already processed before updating

---

## Testing

### Test Cards (Razorpay Test Mode)

| Card Type | Card Number | MM/YY | CVV |
|-----------|-------------|-------|-----|
| Visa | 4111111111111111 | Any future | Any |
| Mastercard | 5555555555554444 | Any future | Any |

### Test UPI
- Use UPI ID: `success@razorpay` for successful payments
- Use UPI ID: `failure@razorpay` for failed payments

---

## Troubleshooting

### Common Issues

1. **Payment not found**: Check if order ID matches in database
2. **Signature verification failed**: Ensure `KEY_SECRET` is correct
3. **Order already processed**: Implement idempotency check
4. **CORS errors**: Ensure API routes are properly configured

### Debug Tips

- Check Razorpay Dashboard for payment status
- Verify MongoDB `Payment` collection records
- Review server logs for error messages
- Test with Razorpay's test credentials first

---

## Razorpay Dashboard Setup

1. Go to [dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Navigate to Settings > API Keys
3. Generate Test/Live API keys
4. Copy Key ID and Key Secret
5. Add to environment variables

---

## Production Checklist

- [ ] Switch from Test to Live API keys
- [ ] Enable Webhook for additional security
- [ ] Implement payment retry logic
- [ ] Add email/SMS notifications
- [ ] Set up refund handling
- [ ] Configure proper error pages
- [ ] Enable 2FA on Razorpay dashboard
