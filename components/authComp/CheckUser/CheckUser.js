"use client";

import { useEffect, useState } from "react";
import { LoginButton } from "../LoginButton/LoginButton";
import { Button } from "@/components/Button/Button";
import { checkLogin } from "@/helper/checkLogin";
import { ViewProfile } from "../ViewProfile/ViewProfile";

export function CheckUser() {
  const [data, setData] = useState("checking");
  useEffect(() => {
    setData(checkLogin());
    console.log(data);
  }, []);

  return data == "checking" ? (
    <div>Checking Details...</div>
  ) : data == "none" ? (
    <LoginButton>
      <Button btn_text={"Login/Register"} />
    </LoginButton>
  ) : (
    <div style={{fontSize:"1.2rem", fontWeight:"bold"}}>
      Hello {data}
      <br />
      <br />
      <ViewProfile><Button btn_text={"View Profile"} /></ViewProfile>
    </div>
  );
}
