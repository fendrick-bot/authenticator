"use client";
import { Button } from "@/components/Button/Button";
import { TextTitle } from "@/components/TextTitle/TextTile";
import { ViewProfile } from "@/components/authComp/ViewProfile/ViewProfile";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Verifyemail() {
  const [token, setToken] = useState("");
  const [verified, isVerifying] = useState(true);
  const [invalid, setInvalid] = useState(false);

  async function VerifyEmail() {
    try {
      await axios.post("/api/emailverification", { token });
      isVerifying(false);

      //   console.log(response)
    } catch (error) {
      setInvalid(true);
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];

    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      VerifyEmail();
    }
  }, [token]);

  useEffect(() => {
    if(invalid){
        window.alert("Token Invalid!");
        window.location.href = "/";
    }


  }, [invalid]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {token == "" ? (
        <div style={{fontSize:"2rem"}}>No Token</div>
      ) : (
        <div>
          <TextTitle title={"Email Verification!"} />
          <br />
          <br />
          {verified ? (
            <div>Verifying your email! Please Wait...</div>
          ) : (
            <div style={{ color: "greenyellow" }}>
              🎉Email Verified
              <br />
              <br />
              <ViewProfile>
                <Button btn_text={"Back to profile"} />
              </ViewProfile>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
