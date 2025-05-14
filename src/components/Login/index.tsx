import { useRef, type FormEvent } from "react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onSwitchToSignup: () => void;
}

function LoginForm({ onSubmit, onSwitchToSignup }: LoginFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current?.reportValidity()) return;

    const formData = new FormData(formRef.current);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    onSubmit(email, password);
  };

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-4 w-80 bg-white shadow-md rounded-lg p-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-light text-sm">
          Email:
        </label>
        <input
          required
          type="email"
          id="email"
          name="email"
          placeholder="example@email.com"
          className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="font-light text-sm">
          Password:
        </label>
        <input
          required
          type="password"
          id="password"
          name="password"
          placeholder="********"
          className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 transition-colors text-white w-full rounded-lg py-3"
      >
        Log In
      </button>

      <button
        type="button"
        onClick={onSwitchToSignup}
        className="text-sm text-blue-500 hover:underline mt-2"
      >
        Don't have an account? Sign Up
      </button>
      
    </form>
  );
}

export default LoginForm;