import { useRef, type FormEvent } from "react";
import type { Account } from "../../types";

interface AccountFormProps {
  initialData?: Account;
  buttonLabel: string;
  onSubmit: (data: Account) => void;
  onSwitchToLogin: () => void;
}

function AccountForm({ initialData, buttonLabel, onSubmit, onSwitchToLogin }: AccountFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current?.reportValidity()) return;

    const formData = new FormData(formRef.current);
    const account: Account = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    onSubmit(account);
  };

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-4 w-80 bg-white shadow-md rounded-lg p-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-light text-sm">
          Your name:
        </label>
        <input
          required
          type="text"
          id="name"
          name="name"
          defaultValue={initialData?.name || ""}
          placeholder="John Doe"
          className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-light text-sm">
          Your email:
        </label>
        <input
          required
          type="email"
          id="email"
          name="email"
          defaultValue={initialData?.email || ""}
          placeholder="example@email.com"
          className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="font-light text-sm">
          Your password:
        </label>
        <input
          required
          type="password"
          id="password"
          name="password"
          defaultValue={initialData?.password || ""}
          placeholder="********"
          className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 transition-colors text-white w-full rounded-lg py-3"
      >
        {buttonLabel}
      </button>

      <button
        type="button"
        onClick={onSwitchToLogin}
        className="text-sm text-blue-500 hover:underline mt-2"
      >
        Already have an account? Log In
      </button>
    </form>
  );
}

export default AccountForm;
