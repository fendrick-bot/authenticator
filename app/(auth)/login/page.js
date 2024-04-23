import LoginForm from "@/components/authComp/loginForm/LoginForm";
import { GoogleLogin } from "@/components/authComp/GoogleLogin/GoogleLogin";
import { GoogleLoginBtn } from "@/components/authComp/GoogleLoginBtn/GoogleLoginBtn";

export default function Login() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <GoogleLogin>
        <LoginForm />
      </GoogleLogin>
    </div>
  );
}
