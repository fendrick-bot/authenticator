"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button/Button";
import axios from "axios";
import { TextLabel } from "@/components/TextLabel/TextLabel";
import { LogoutButton } from "@/components/authComp/LogoutButton/LogoutButton";
import { TextTitle } from "@/components/TextTitle/TextTile";

export default function ProfileDetails() {
  const [data, setData] = useState({
    id: "not found",
    username: "not found",
    email: "not found",
  });
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
  ) : (
    <div
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
        <TextTitle title={"User Details: "} />
        <br />
        <br />
        <TextLabel label_text={"User Id :- "} /><span style={{color:"greenyellow"}}>{data.id}</span>
        <br />
        <TextLabel label_text={"Username :- "} /><span style={{color:"greenyellow"}}>{data.username}</span>
        <br />
        <TextLabel label_text={"Email :- "} /><span style={{color:"greenyellow"}}>{data.email}</span>
        <br /><br /><br />

        <LogoutButton><Button btn_text={"Logout"} /></LogoutButton>
    </div>
  );
}
