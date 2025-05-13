import { useContext } from "react";
import type { Account } from "../types";
import { AuthContext } from "../context";

export const useAuth = () => {
  const { account, setAccount, signOut, setSignOut } = useContext(AuthContext);

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
  };

  const createAccount = (newAccount: Account) => {
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
