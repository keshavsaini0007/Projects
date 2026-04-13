# Razorpay Payment Flow on Profile Page

## Overview
This document explains the complete payment flow when a user makes a payment to a creator's profile using Razorpay in this Patreon-clone application.

## Flow Diagram

```
User Profile Page
       │
       ▼
┌─────────────────┐
│ PaymentPage     │  (components/PaymentPage.js)
│ - Enter amount  │
│ - Enter name    │
│ - Enter message │
└────────┬────────┘
         │
         │ Click "Pay" button
         ▼
┌─────────────────────────┐
│ pay() function          │
│ - Call initiate()       │
│   (Server Action)       │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│ initiate() Server Action        │  (actions/useractions.js)
│ - Create Razorpay order        │
│ - Save payment to MongoDB      │
│ - Return order to frontend     │
└────────┬──────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│ Razorpay Checkout               │
│ - Open Razorpay payment modal   │
│ - User completes payment        │
└────────┬───────────────────────-┘
         │
         │ Payment success
         ▼
┌─────────────────────────────────┐
│ POST /api/razorpay             │  (app/api/razorpay/route.js)
│ - Verify payment signature     │
│ - Update payment status       │
│ - Redirect to profile          │
└─────────────────────────────────┘
```

## Step-by-Step Explanation

### Step 1: User Initiates Payment (PaymentPage.js)
- User enters:
  - Amount (or clicks quick amounts: ₹10, ₹20, ₹30)
  - Name
  - Message
- User clicks "Pay" button
- `pay(amount)` function is called

### Step 2: Server Action - initiate() (actions/useractions.js)
- Called via: `await initiate(amount, username, paymentform)`
- Server connects to MongoDB
- Creates a Razorpay order using Razorpay SDK:
  ```javascript
  instance.orders.create({ amount, currency: "INR" })
  ```
- Saves a **pending payment record** in MongoDB `Payment` collection:
  ```javascript
  Payment.create({ 
    oid: orderId,       // Razorpay order ID
    amount,             // Payment amount
    to_user: username,  // Creator's username
    name: paymentform.name,
    message: paymentform.message
  })
  ```
- Returns the Razorpay order object to frontend

### Step 3: Razorpay Checkout (PaymentPage.js)
- Frontend receives order ID
- Opens Razorpay checkout modal with options:
  - `key`: Razorpay Key ID
  - `order_id`: Order ID from Step 2
  - `callback_url`: `/api/razorpay`
- User completes payment in Razorpay popup

### Step 4: Payment Verification (app/api/razorpay/route.js)
- After payment, Razorpay sends POST request to callback URL
- Request contains:
  - `razorpay_order_id`
  - `razorpay_payment_id`
  - `razorpay_signature`
- Server validates using `validatePaymentVerification()`
- If valid:
  - Updates payment record: `done: true`
  - Redirects to: `/{username}?paymentDone=success`

## Database Schema

### Payment Model (models/Payment.js)
```javascript
{
  oid: String,         // Razorpay Order ID
  amount: Number,     // Payment amount
  to_user: String,   // Creator's username
  name: String,       // Supporter's name
  message: String,   // Support message
  done: Boolean      // Payment completed flag
}
```

## Key Files

| File | Purpose |
|------|---------|
| `components/PaymentPage.js` | Frontend UI for payment form |
| `actions/useractions.js` | Server action to create order |
| `app/api/razorpay/route.js` | Callback endpoint for verification |
| `models/Payment.js` | MongoDB schema for payments |

## Environment Variables Required
- `NEXT_PUBLIC_KEY_ID` - Razorpay Key ID (public)
- `KEY_SECRET` - Razorpay Key Secret (private)
- `NEXT_PUBLIC_URL` - App URL for redirects