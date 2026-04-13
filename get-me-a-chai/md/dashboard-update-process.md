# Dashboard Profile Update Process

## Overview
This document explains the complete flow of how user profile data is updated from the Dashboard page to the MongoDB database.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DASHBOARD UPDATE FLOW                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────┐         ┌─────────────────┐         ┌──────────────────────┐
│   Browser    │         │  Next.js Server  │         │      MongoDB         │
│   (Client)   │         │  (Server Actions)│         │      Database       │
└──────┬───────┘         └────────┬─────────┘         └──────────┬───────────┘
       │                          │                             │
       │  1. Fill Form            │                             │
       │─────────────────────────>│                             │
       │                          │                             │
       │  2. Submit Form          │                             │
       │─────────────────────────>│                             │
       │                          │                             │
       │                          │  3. Get Session Data        │
       │                          │  (username from cookie)     │
       │                          │                             │
       │                          │  4. connectDB()              │
       │                          │─────────────────────────────>│
       │                          │                             │
       │                          │  5. findOneAndUpdate()       │
       │                          │─────────────────────────────>│
       │                          │                             │
       │                          │  6. Updated Document        │
       │                          │<─────────────────────────────│
       │                          │                             │
       │  7. Success/Error Alert  │                             │
       │<─────────────────────────│                             │
       │                          │                             │
```

---

## Step-by-Step Process

### Step 1: User Authentication (Before Dashboard Access)

Before accessing the dashboard, user must be logged in via GitHub OAuth.

```
User clicks "Login with GitHub"
        ↓
NextAuth redirects to GitHub
        ↓
User authorizes the app
        ↓
GitHub returns to callback URL
        ↓
NextAuth creates session with JWT
```

**File:** `app/api/auth/[...nextauth]/route.js`

```javascript
// Session callback maps database fields to session
async session({ session, user, token }) {
  const dbUser = await User.findOne({ email: session.user.email });
  session.user.name = dbUser.username;
  session.user.username = dbUser.username;  // This is used for updates!
  return session;
}
```

The session cookie is stored in the browser and sent with every request.

---

### Step 2: Dashboard Page Load

**File:** `app/dashboard/page.js`

```javascript
"use client"
const dashboard = () => {
  const { data: session } = useSession()
  
  useEffect(() => {
    if (session === null) router.replace('/login')
  }, [])
  
  return <Dashboard />
}
```

The dashboard page:
1. Checks if user is logged in (via NextAuth session)
2. If not logged in, redirects to `/login`
3. If logged in, renders the `Dashboard` component

---

### Step 3: Fetch Current User Data

**File:** `components/Dashboard.js`

```javascript
const Dashboard = () => {
  const { data: session } = useSession()
  const [form, setform] = useState({})
  
  useEffect(() => {
    getData()
  }, [])
  
  const getData = async () => {
    const username = session?.user?.username
    if (!username) return
    
    let data = await fetchuser(username)
    setform(data)
  }
}
```

This function:
1. Gets username from session (`session.user.username`)
2. Calls `fetchuser` server action
3. Populates form with existing user data

---

### Step 4: User Edits Form

**File:** `components/Dashboard.js`

```javascript
const handleChange = (e) => {
  setform({ ...form, [e.target.name]: e.target.value })
}
```

When user types in any input:
1. `onChange` event fires
2. `handleChange` updates the `form` state
3. Input fields show the updated values

---

### Step 5: Form Submission

**File:** `components/Dashboard.js`

```javascript
const handleSubmit = async (e) => {
  // Prevent default form behavior (page refresh)
  e.preventDefault()
  
  // Extract form data from HTML form
  const formData = new FormData(e.target)
  
  // Convert to plain JavaScript object
  const data = Object.fromEntries(formData)
  // Result: { name: "...", email: "...", username: "...", ... }
  
  // Call server action with form data and current username
  const result = await updateProfile(data, session.user.username)
  
  // Show result to user
  if (result.success) {
    alert("Profile updated successfully!")
  } else {
    alert("Error: " + result.message)
  }
}
```

**Form HTML:**
```jsx
<form onSubmit={handleSubmit}>
  <input name="name" value={form.name} onChange={handleChange} />
  <input name="email" value={form.email} onChange={handleChange} />
  <input name="username" value={form.username} onChange={handleChange} />
  <button type="submit">Save</button>
</form>
```

The `name` attribute on inputs is crucial - it becomes the key in the form data object.

---

### Step 6: Server Action Processing

**File:** `actions/useractions.js`

```javascript
export const updateProfile = async (data, oldusername) => {
  try {
    // Step 6a: Connect to MongoDB
    await connectDb()
    
    // Step 6b: Validate username change
    // If user is changing their username, check if new username exists
    if (data.username !== oldusername) {
      const existingUser = await User.findOne({ username: data.username })
      if (existingUser) {
        return { success: false, message: "Username already exists" }
      }
    }
    
    // Step 6c: Remove fields that shouldn't be updated
    const { _id, createdAt, ...updateData } = data
    
    // Step 6d: Update the user in database
    const result = await User.findOneAndUpdate(
      { username: oldusername },    // Find user by OLD username
      updateData,                   // Update with new data
      { new: true }                 // Return updated document
    )
    
    // Step 6e: Check if update was successful
    if (!result) {
      return { success: false, message: "User not found" }
    }
    
    return { success: true, message: "Profile updated successfully" }
    
  } catch (error) {
    return { success: false, message: error.message }
  }
}
```

---

### Step 7: MongoDB Update

**File:** `models/User.js`

```javascript
const UserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String },
  username: { type: String, required: true },
  profilepic: { type: String },
  coverpic: { type: String },
  razorpayid: { type: String },
  razorpaysecret: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})
```

The MongoDB query executed:

```javascript
db.users.findOneAndUpdate(
  { username: "old_username" },           // Query: find this user
  { 
    $set: {
      name: "New Name",
      email: "new@email.com",
      username: "new_username",
      profilepic: "https://...",
      coverpic: "https://...",
      razorpayid: "rzp_...",
      razorpaysecret: "..."
    }
  },                                      // Update: set these fields
  { new: true }                           // Options: return updated doc
)
```

---

### Step 8: Response to Client

The server action returns a response object:

```javascript
// Success case
{ success: true, message: "Profile updated successfully" }

// Error cases
{ success: false, message: "Username already exists" }
{ success: false, message: "User not found" }
{ success: false, message: "CastError: ..." }
```

---

### Step 9: UI Update

**File:** `components/Dashboard.js`

```javascript
const handleSubmit = async (e) => {
  // ... submit form ...
  
  const result = await updateProfile(data, session.user.username)
  
  if (result.success) {
    alert("Profile updated successfully!")
    // Optionally refresh data
    await getData()
  } else {
    alert("Error: " + result.message)
  }
}
```

User sees an alert confirming success or failure.

---

## Data Flow Diagram

```
Form Input Fields
       │
       ▼
┌─────────────────────────────────┐
│  <input name="name" />         │
│  <input name="email" />        │
│  <input name="username" />      │
│  ...                            │
└────────────┬────────────────────┘
             │
             │ onSubmit event
             ▼
┌─────────────────────────────────┐
│  handleSubmit(e)               │
│  - e.preventDefault()          │
│  - new FormData(e.target)      │
│  - Object.fromEntries(formData)│
└────────────┬────────────────────┘
             │
             │ data object
             ▼
┌─────────────────────────────────┐
│  updateProfile(data, username) │
│  (Server Action)                │
└────────────┬────────────────────┘
             │
             │ FormData sent to server
             ▼
┌─────────────────────────────────┐
│  connectDB()                   │
│  (MongoDB Connection)           │
└────────────┬────────────────────┘
             │
             │
             ▼
┌─────────────────────────────────┐
│  User.findOneAndUpdate(        │
│    { username: oldusername },   │
│    updateData                  │
│  )                             │
└────────────┬────────────────────┘
             │
             │ Database updated
             ▼
┌─────────────────────────────────┐
│  Return { success: true/false }│
└────────────┬────────────────────┘
             │
             │ Response
             ▼
       Alert to User
```

---

## Key Components Involved

| File | Role |
|------|------|
| `app/dashboard/page.js` | Page wrapper with auth check |
| `components/Dashboard.js` | Form UI and event handlers |
| `actions/useractions.js` | Server-side update logic |
| `models/User.js` | MongoDB schema definition |
| `db/connectDb.js` | Database connection |
| `app/api/auth/[...nextauth]/route.js` | Authentication session |

---

## Environment Variables Used

| Variable | Purpose |
|----------|---------|
| `GITHUB_ID` | GitHub OAuth app client ID |
| `GITHUB_SECRET` | GitHub OAuth app client secret |
| `MONGODB_URI` | MongoDB connection string (in connectDb.js) |

---

## Common Issues & Solutions

### Issue 1: "session.user.username is undefined"
**Cause:** Session callback doesn't set username property
**Fix:** Add `session.user.username = dbUser.username` in auth options

### Issue 2: "User not found"
**Cause:** Wrong username passed to update function
**Fix:** Check that `session.user.username` has correct value

### Issue 3: Form data not being captured
**Cause:** Input fields missing `name` attribute
**Fix:** Add `name` attribute matching the field name

### Issue 4: "Username already exists"
**Cause:** Trying to change to existing username
**Fix:** Choose a unique username

---

## Testing the Flow

1. Open browser DevTools → Console
2. Go to `/dashboard`
3. Login with GitHub
4. Modify a field
5. Click Save
6. Watch console for logs:
   ```
   Submitting form data: { name: "...", ... }
   updateProfile called with: { data: {...}, oldusername: "..." }
   Update result: { success: true, ... }
   ```
7. Check MongoDB Compass or CLI:
   ```javascript
   db.users.findOne({ username: "your_username" })
   ```

---

## Security Considerations

1. **Authentication Required**: Dashboard only accessible when logged in
2. **Server Actions**: All database operations happen on server
3. **No Direct DB Access**: Client only sends form data, never raw queries
4. **Session Validation**: `oldusername` from session prevents unauthorized updates

---

## Future Improvements

1. **Optimistic UI**: Show updated values immediately, rollback on error
2. **Better Error Handling**: Show inline errors instead of alerts
3. **Image Upload**: Support actual file uploads for profile pictures
4. **Debouncing**: Auto-save after typing stops (like Google Docs)
5. **Undo Feature**: Allow reverting changes within a time window
