"use client";
import { Button } from "@/components/Button/Button";
import { TextLabel } from "@/components/TextLabel/TextLabel";
import { TextTitle } from "@/components/TextTitle/TextTile";
import axios from "axios";
import { Fascinate } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function SignupForm() {
  const router = useRouter();
  const [user, setuser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, isLoading] = useState(false);

  async function signupSubmit(e) {
    isLoading(true);
    e.preventDefault();
    console.log(user);
    try {
      const response = await axios.post("/api/signup", user);
      console.log(response);
      router.push("/login");
    } catch (error) {
      toast.error("Sign up Failed ");
      console.log("sign up failed" + error);
    } finally {
      isLoading(false);
    }
  }
  return (
    <form
      onSubmit={signupSubmit}
      style={{
        width: "fit-content",
        height: "fit-content",
        borderRadius: "20px",
        border: "2px solid white",
        backgroundColor: "black",
        fontWeight: "bold",
        color: "white",
        minWidth: "300px",
        minHeight: "300px",
        padding: "20px",
      }}
    >
      <TextTitle title={"New User? Signup"} />
      <br />
      <br />
      <TextLabel label_text={"Full Name :"} />
      <br />
      <input
        style={{
          padding: "2px 10px",
          width: "250px",
          height: "40px",
          margin: "10px 0",
          color: "white",
          backgroundColor: "black",
          border: "2px solid white",
          borderRadius: "8px",
          fontSize: "1rem",
        }}
        type="name"
        id="username"
        value={user.username}
        required={true}
        autoComplete="name"
        placeholder="Demo Name"
        onChange={(e) => setuser({ ...user, username: e.target.value })}
      />
      <br />
      <TextLabel label_text={"Email :"} />
      <br />

      <input
        style={{
          padding: "2px 10px",
          width: "250px",
          height: "40px",
          margin: "10px 0",
          color: "white",
          backgroundColor: "black",
          border: "2px solid white",
          borderRadius: "8px",
          fontSize: "1rem",
        }}
        type="email"
        id="email"
        value={user.email}
        required={true}
        autoComplete="email"
        placeholder="example@gmail.com"
        onChange={(e) => setuser({ ...user, email: e.target.value })}
      />
      <br />
      <TextLabel label_text={"Password :"} />
      <br />
      <input
        style={{
          padding: "2px 10px",
          width: "250px",
          height: "40px",
          margin: "10px 0",
          color: "white",
          backgroundColor: "black",
          border: "2px solid white",
          borderRadius: "8px",
          fontSize: "1rem",
        }}
        type="password"
        id="password"
        value={user.password}
        required={true}
        autoComplete="password"
        minLength={8}
        placeholder="********"
        onChange={(e) => setuser({ ...user, password: e.target.value })}
      />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          btn_text={loading ? "processing..." : "⠀⠀⠀⠀⠀⠀⠀⠀Sign Up⠀⠀⠀⠀⠀⠀⠀⠀⠀"}
        />
      </div>
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          href="/login"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "lighter",
          }}
        >
          Already have an account? Log In
        </Link>
      </div>
    </form>
  );
}
