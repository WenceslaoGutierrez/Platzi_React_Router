import { useAuth } from "../../hooks";


function LogoutButton() {
  const { account, signOutUser } = useAuth();

  return (
    <div className="flex flex-col items-center gap-2 ">
      <p className="text-gray-700 text-sm">Signed in as <span className="font-medium">{account.name}</span></p>
      <button
        onClick={signOutUser}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
      >
        Log Out
      </button>
    </div>
  );
}

export default LogoutButton;
