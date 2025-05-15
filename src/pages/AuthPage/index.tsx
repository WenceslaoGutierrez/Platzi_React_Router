import { useAuth, useAuthMode } from "../../hooks";
import LogoutButton from "../../components/Logout";
import LoginForm from "../../components/Login";
import AccountForm from "../../components/AccountForm";
import type { Account } from "../../types";
import Layout from "../../components/Layout";

function AuthPage() {
  const { signOut, signIn, createAccount } = useAuth();
  const { mode, renderAuthForm } = useAuthMode();

  const renderView = () => {
    if (!signOut) {
      return <LogoutButton />;
    }

    if (mode === "login") {
      return renderAuthForm({
        header: "Log In",
        FormComponent: LoginForm,
        onSubmit: (email: string, password: string) => {
          const success = signIn(email, password);
          if (!success) alert("Invalid credentials");
        },
        switchToPath: "signup",
      });
    }

    if (mode === "signup") {
      return renderAuthForm({
        header: "Create Account",
        FormComponent: AccountForm,
        buttonLabel: "Sign Up",
        onSubmit: (data: Account) => {
          createAccount(data);
        },
        switchToPath: "login",
      });
    }
  };
  return <Layout>{renderView()}</Layout>;
}

export default AuthPage;