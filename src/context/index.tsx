import { createContext, useState, type ReactNode } from "react";
import type { Account, AccountContext } from "../types";
import { getParsedBoolean, getParsedStorageObject } from "../utils";

export const AuthContext = createContext({} as AccountContext);

export const initializeLocalStorage = (): { account: Account; signOut: boolean } => {
  if (!localStorage.getItem("sign-out")) {
    localStorage.setItem("sign-out", "true");
  }

  if (!localStorage.getItem("account")) {
    localStorage.setItem("account", JSON.stringify({ name: "", email: "", password: "" }));
  }

  const parsedAccount = getParsedStorageObject("account") as Account;
  const parsedSignout = getParsedBoolean("sign-out");

  return {
    account: parsedAccount,
    signOut: parsedSignout,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  //Initial values from Local Storage
  const { account: initialAccount, signOut: initialSignOut } = initializeLocalStorage();

  // Auth · Account & SignOut
  const [account, setAccount] = useState<Account>(initialAccount);
  const [signOut, setSignOut] = useState<boolean>(initialSignOut);

  return (
    <AuthContext.Provider
      value={{
        account,
        setAccount,
        signOut,
        setSignOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
