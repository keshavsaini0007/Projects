# Profile Update Bug Fix - Debug Report

## Problem
User profile data was not being saved to the database when updating from the Dashboard.

---

## Root Causes Found

### Bug 1: Session Callback Missing `username` Property
**File:** `app/api/auth/[...nextauth]/route.js`

**Issue:** The NextAuth session callback was only setting `session.user.name` but not `session.user.username`.

```javascript
// BEFORE (Broken)
async session({ session, user, token }) {
  const dbUser = await User.findOne({ email: session.user.email });
  session.user.name = dbUser.username;    // Only 'name' was set
  return session;
}

// AFTER (Fixed)
async session({ session, user, token }) {
  const dbUser = await User.findOne({ email: session.user.email });
  session.user.name = dbUser.username;
  session.user.username = dbUser.username;  // Added 'username' property
  return session;
}
```

**Why this caused the bug:** The Dashboard component was calling:
```javascript
await updateProfile(data, session.user.username);
```

Since `session.user.username` was `undefined`, the query in `findOneAndUpdate` was searching for a user with `username: undefined`, which doesn't exist in the database.

---

### Bug 2: Dashboard `handleSubmit` Passed Wrong Data
**File:** `components/Dashboard.js`

**Issue:** The original code was passing the form submit event (`e`) instead of actual form data.

```javascript
// BEFORE (Broken)
const handleSubmit = async (e) => {
  await updateProfile(e, session.user.username);  // ❌ e is event, not data!
}

// AFTER (Fixed)
const handleSubmit = async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData)
  const result = await updateProfile(data, session.user.username);
  if (result.success) {
    alert("Profile updated successfully!")
  } else {
    alert("Error: " + result.message)
  }
}
```

---

### Bug 3: Server Action Double Object.fromEntries
**File:** `actions/useractions.js`

**Issue:** `Object.fromEntries(data)` was being called twice - once on client and once on server. The second call fails because `data` is already a plain object.

```javascript
// BEFORE (Broken)
export const updateProfile = async (data, oldusername) => {
  await connectDb()
  let newData = Object.fromEntries(data)  // ❌ Already an object!
  await User.findOneAndUpdate({ username: oldusername }, newData)
}

// AFTER (Fixed)
export const updateProfile = async (data, oldusername) => {
  try {
    await connectDb()
    console.log("updateProfile called with:", { data, oldusername })

    // Remove _id and createdAt from data (can't be updated)
    const { _id, createdAt, ...updateData } = data
    
    const result = await User.findOneAndUpdate(
      { username: oldusername }, 
      updateData,
      { new: true, runValidators: true }
    )
    
    if (!result) {
      return { success: false, message: "User not found" }
    }
    
    return { success: true, message: "Profile updated successfully" }
  } catch (error) {
    console.error("Update profile error:", error)
    return { success: false, message: error.message }
  }
}
```

**Improvements made:**
- Added try-catch for error handling
- Added logging for debugging
- Removed `_id` and `createdAt` from update data (MongoDB manages these)
- Added `{ new: true }` to return the updated document
- Added `{ runValidators: true }` to validate against schema
- Returns proper success/error messages

---

## Debugging Steps Taken

1. **Added console.log statements** to trace data flow:
   - In `Dashboard.js`: Log form data before submission
   - In `useractions.js`: Log received data and oldusername
   - In NextAuth session callback: Log dbUser

2. **Checked the data flow**:
   ```
   Form Input → handleSubmit → updateProfile → MongoDB
   ```

3. **Identified the null reference**: Found that `session.user.username` was `undefined`

---

## How to Test

1. Go to `/dashboard`
2. Login with GitHub
3. Modify any profile field (name, username, profilepic, etc.)
4. Click "Save"
5. Check browser console for logs:
   - `Submitting form data: { ... }`
   - `updateProfile called with: { data: {...}, oldusername: "..." }`
   - `Update result: { ... }`
6. Check MongoDB to verify data was saved

---

## MongoDB Query That Was Failing

```javascript
// This was the query being executed:
User.findOneAndUpdate(
  { username: undefined },  // No user matches this!
  { name: "...", email: "...", ... }
)
```

Since no user has `username: undefined`, the update did nothing.

---

## Files Modified

| File | Changes |
|------|---------|
| `app/api/auth/[...nextauth]/route.js` | Added `session.user.username` |
| `components/Dashboard.js` | Fixed form data extraction, added error handling |
| `actions/useractions.js` | Added error handling, logging, removed double fromEntries |

---

## Lesson Learned

Always ensure that session data contains all properties that components expect. When using custom session callbacks, map all necessary fields from the database to the session object.
