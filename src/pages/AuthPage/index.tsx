import { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import LogoutButton from "../../components/Logout";
import LoginForm from "../../components/Login";
import AccountForm from "../../components/AccountForm";
import type { Account } from "../../types";
import Layout from "../../components/Layout";
import { useLocation, useNavigate } from "react-router-dom";

function AuthPage() {
  const { signOut, signIn, createAccount } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getModeFromPath = (): "login" | "signup" =>
    location.pathname.includes("signup") ? "signup" : "login";

  const [mode, setMode] = useState<"login" | "signup">(getModeFromPath());

  useEffect(() => {
    setMode(getModeFromPath());
  }, [location.pathname]);

  const switchToLogin = () => navigate("/login");
  const switchToSignup = () => navigate("/signup");

  const renderView = () => {
    if (!signOut) {
      return <LogoutButton />;
    }

    if (mode === "login") {
      return (
        <>
          <h2 className="text-2xl font-bold mb-4">Log In</h2>
          <LoginForm
            onSubmit={(email, password) => {
              const success = signIn(email, password);
              if (!success) alert("Invalid credentials");
            }}
            onSwitchToSignup={switchToSignup}
          />
        </>
      );
    }

    if (mode === "signup") {
      return (
        <>
          <h2 className="text-2xl font-bold mb-4">Create Account</h2>
          <AccountForm
            onSubmit={(data: Account) => {
              createAccount(data);
            }}
            buttonLabel="Sign Up"
            onSwitchToLogin={switchToLogin}
          />
        </>
      );
    }
  };

  return <Layout>{renderView()}</Layout>;
}

export default AuthPage;