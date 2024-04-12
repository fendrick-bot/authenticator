"use client";
import { Button } from "@/components/Button/Button";
import { TextLabel } from "@/components/TextLabel/TextLabel";
import { TextTitle } from "@/components/TextTitle/TextTile";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const [loading, isLoading] = useState(false);
  const router = useRouter();

  async function loginSubmit(e) {
    isLoading(true);
    e.preventDefault();
    console.log(user);
    try {
      const response = await axios.post("/api/login", user);
      console.log(response);
      router.push("/");
    } catch (error) {
      toast.error("Login Failed ");
      console.log("Login failed" + error);
    } finally {
      isLoading(false);
    }
  }

  return loading ? (
    <TextTitle title={"processing..."} />
  ) : (
    <form
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
      onSubmit={loginSubmit}
    >
      <TextTitle title={"Login to continue:"} />
      <br />
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
        <Button btn_text={"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀Login⠀⠀⠀⠀⠀⠀⠀⠀⠀"} />
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
          href="/signup"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "lighter",
          }}>Did not have an account? Sign Up</Link>
      </div>
    </form>
  );
}