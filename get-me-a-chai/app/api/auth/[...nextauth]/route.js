import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github") {
        // connecting to the database
        await connectDB();
        // checking if user already exists in the database
        const currentUser = await User.findOne({ email: email });
        if (!currentUser) {
          // if user does not exist, create a new user in the database
          const newUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }
        return true;
      }
    },
    async session({ session, user, token }) {
      const dbUser = await User.findOne({ email: session.user.email });
      console.log(dbUser);
      // session.user.name = dbUser.username;
      session.user.username = dbUser.username;
      return session;
    },
  },
});

export { authoptions as GET, authoptions as POST };

// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'

// AppleProvider({
//     clientId: process.env.APPLE_ID,
//     clientSecret: process.env.APPLE_SECRET
// }),
// FacebookProvider({
//     clientId: process.env.FACEBOOK_ID,
//     clientSecret: process.env.FACEBOOK_SECRET
// }),
// GoogleProvider({
//     clientId: process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_SECRET
// }),
// // Passwordless / email sign in
// EmailProvider({
//     server: process.env.MAIL_SERVER,
//     from: 'NextAuth.js <no-reply@example.com>'
// }),
