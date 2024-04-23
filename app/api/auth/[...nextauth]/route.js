import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLECLIENTID,
      clientSecret: process.env.GOOGLECLIENTSECRET,
    }),
  ],
  secret: process.env.TOKEN_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      console.log(user);
      if (account.provider === "google") {
        try {
          console.log("calling api");
          const response = await axios.post("/api/login", {
            username: user.name,
            email: user.email,
            password: process.env.TOKEN_SECRET,
            login_type: "google",
          });
          console.log(response);
        } catch (error) {
          console.log("login failed" + error);
        }
      }
    },
  },
});
export { handler as GET, handler as POST };
