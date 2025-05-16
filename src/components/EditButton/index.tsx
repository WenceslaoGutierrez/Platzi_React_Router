import { hasPermission } from "../../auth";
import { useAuth } from "../../hooks";

const EditButton = () => {
  const { account } = useAuth();

  if (!hasPermission(account.role, "edit")) return null;

  return <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Edit</button>;
};

export default EditButton;