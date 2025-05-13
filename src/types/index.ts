export type Account = {
  name: string;
  email: string;
  password: string;
};

export type AccountContext = {
    account: Record<string, unknown>;
    setAccount: (data: Record<string, unknown>) => void;
    signOut: boolean;
    setSignOut: (value: boolean) => void;
}