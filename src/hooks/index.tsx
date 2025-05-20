import { useContext, useEffect, useState } from "react";
import type { Account } from "../types";
import { AuthContext } from "../context";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { account, setAccount, signOut, setSignOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const getUsers = (): Account [] =>{
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  const setUsers = (users: Account[]) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const signIn = (email: string, password: string): boolean => {

    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    
    if (user) {
      setAccount(user);
      setSignOut(false);
      localStorage.setItem("account", JSON.stringify(user));
      localStorage.setItem("sign-out", "false");
      return true;
    }

    return false;
  };

  const signOutUser = () => {
    setSignOut(true);
    localStorage.setItem("sign-out", "true");
    localStorage.setItem("account", JSON.stringify({ name: "", email: "", password: "", role: "" }));
    navigate("/login");
  };

  const createAccount = (data: Account) => {
    const users = getUsers();

    const exists = users.some(u => u.email === data.email);
    if (exists) {
      alert("Email already in use.");
      return;
    }

    const newAccount: Account = { ...data, role: "user" };
    const updatedUsers = [...users, newAccount];

    setUsers(updatedUsers);
    setAccount(newAccount);
    setSignOut(false);
    localStorage.setItem("account", JSON.stringify(newAccount));
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