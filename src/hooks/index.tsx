import { useContext, useEffect, useState } from "react";
import type { Account } from "../types";
import { AuthContext } from "../context";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { account, setAccount, signOut, setSignOut } = useContext(AuthContext);
  const navigate = useNavigate();


  const signIn = (email: string, password: string): boolean => {
    const storedAccount = localStorage.getItem("account");
    if (!storedAccount) return false;

    const parsedAccount = JSON.parse(storedAccount) as Account;

    const valid =
      parsedAccount.email === email && parsedAccount.password === password;

    if (valid) {
      setAccount(parsedAccount);
      setSignOut(false);
      localStorage.setItem("sign-out", "false");
    }

    return valid;
  };

  const signOutUser = () => {
    setSignOut(true);
    localStorage.setItem("sign-out", "true");
    navigate("/login");
  };

  const createAccount = (data: Omit<Account, "role">) => {
    const newAccount: Account = {
      ...data,
      role: "user",
    };
    localStorage.setItem("account", JSON.stringify(newAccount));
    setAccount(newAccount);
    setSignOut(false);
    localStorage.setItem("sign-out", "false");
  };

  return {
    account,
    signOut,
    signIn,
    signOutUser,
    createAccount,
  };
};

export const useAuthMode = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getModeFromPath = (): string => {
    const path = location.pathname.split("/").pop();
    return path ?? "login";
  };

  const [mode, setMode] = useState(getModeFromPath());

  useEffect(() => {
    setMode(getModeFromPath());
  }, [location.pathname]);

  const switchTo = (path: string) => {
    navigate(`/${path}`, { state: location.state });
  };

  const renderAuthForm = <T,>({
    header,
    buttonLabel,
    FormComponent,
    onSubmit,
    switchToPath,
  }: {
    header: string;
    buttonLabel?: string;
    FormComponent: React.ComponentType<{
      onSubmit: (...args: T[]) => void;
      onSwitchTo: () => void;
      buttonLabel?: string;
    }>;
    onSubmit: (...args: T[]) => void;
    switchToPath: string;
  }) => {
    const formProps = {
      onSubmit,
      onSwitchTo: () => switchTo(switchToPath),
      ...(buttonLabel && { buttonLabel }),
    };

    return (
      <>
        <h2 className="text-2xl font-bold mb-4">{header}</h2>
        <FormComponent {...formProps} />
      </>
    );
  };

  return { mode, switchTo, renderAuthForm };
};