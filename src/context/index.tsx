import { createContext, useState, type ReactNode } from "react";
import type { AccountContext } from "../types";
import { getParsedBoolean, getParsedStorageObject } from "../utils";

export const LoginContext = createContext({} as AccountContext);

export const initializeLocalStorage = (): { account: Record<string, unknown>; signOut: boolean } => {
  const parsedAccount = getParsedStorageObject('account');
  const parsedSignout = getParsedBoolean('sign-out');

  return { account: parsedAccount, signOut: parsedSignout };
};

export const ContextProvider = ({ children }: { children: ReactNode }) => {

  //Initial values from Local Storage
  const { account: initialAccount, signOut: initialSignOut } = initializeLocalStorage();

  // Auth · Account & SignOut
  const [account, setAccount] = useState<Record<string, unknown>>(initialAccount);
  const [signOut, setSignOut] = useState<boolean>(initialSignOut);

  return (
    <LoginContext.Provider
      value={{
        account,
        setAccount,
        signOut,
        setSignOut
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};