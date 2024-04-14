"use client";

import { useEffect, useState } from "react";
import { LoginButton } from "../LoginButton/LoginButton";
import { Button } from "@/components/Button/Button";
// import { checkLogin } from "@/helper/checkLogin";
import { ViewProfile } from "../ViewProfile/ViewProfile";

import axios from "axios";

export function CheckUser() {
  const [user, setUser] = useState(true);
  const [data, setData] = useState({ id: "", username: "", email: "zz" });
  const [loading, isLoading] = useState(true);

  async function checkLogin() {
    try {
      const response = await axios.get("/api/me");
      const res = response.data.user;
      setData({
        ...data,
        username: res.username,
        email: res.email,
        id: res._id,
      });
      setUser(false);
    } catch (error) {
    } finally {
      isLoading(false);
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return loading ? (
    <div>Checking Details...</div>
  ) : user ? (
    <LoginButton>
      <Button btn_text={"Login/Register"} />
    </LoginButton>
  ) : (
    <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
      Hello {data.username}
      <br />
      <br />
      <ViewProfile>
        <Button btn_text={"View Profile"} />
      </ViewProfile>



      
    </div>
  );
}
