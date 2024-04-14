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
    isVerified: false,
  });
  const [loading, isLoading] = useState(true);
  const [mailSent, setMailSent] = useState(false);

  async function verifyClick() {
    try {
      setMailSent(true)
      const response = await axios.post("/api/sendVerificationMail" , data);
      console.log(response)
    } catch (error) {
      console.log("unable to send email");
    }
  }

  async function checkLogin() {
    try {
      const response = await axios.get("/api/me");
      const res = response.data.user;
      setData({
        ...data,
        username: res.username,
        email: res.email,
        id: res._id,
        isVerified: res.isVerified,
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
      <TextLabel label_text={"User Id :- "} />
      <span style={{ color: "greenyellow" }}>{data.id}</span>
      <br />
      <TextLabel label_text={"Username :- "} />
      <span style={{ color: "greenyellow" }}>{data.username}</span>
      <br />
      <TextLabel label_text={"Email :- "} />
      <span style={{ color: "greenyellow" }}>{data.email}</span>
      <br />
      {data.isVerified ? (
        <div>
          <TextLabel label_text={"Email Verified :- "} />
          <span style={{ color: "greenyellow" }}>True</span>{" "}
        </div>
      ) : (
        <div>
          <TextLabel label_text={"Email Verified :- "} />
          <span style={{ color: "greenyellow" }}>False</span> <br /> <br />
          {mailSent ? (
            <span style={{ color: "skyblue" }}>
              Verification link has been sent to your email
            </span>
          ) : (
            <span
              style={{ color: "skyblue", cursor: "pointer" }}
              onClick={verifyClick}
            >
              Verify Email
            </span>
          )}
        </div>
      )}
      <br />
      <br />

      <LogoutButton>
        <Button btn_text={"Logout"} />
      </LogoutButton>
    </div>
  );
}
