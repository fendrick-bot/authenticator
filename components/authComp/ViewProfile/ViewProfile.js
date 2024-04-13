"use client";
import { useRouter } from "next/navigation";

export function ViewProfile({ children }) {
  const router = useRouter();
  function profileClick() {
    router.push("/myprofile");
  }
  return <span onClick={profileClick}>{children}</span>;
}
