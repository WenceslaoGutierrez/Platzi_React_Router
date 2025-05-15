export type Account = {
  name: string;
  email: string;
  password: string;
};

export type AccountContext = {
    account: Account;
    setAccount: (data: Account) => void;
    signOut: boolean;
    setSignOut: (value: boolean) => void;
}

export type RouteItem = {
  to: string;
  text: string;
  private: boolean;
};