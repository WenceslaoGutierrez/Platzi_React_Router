import { useNavigate, useParams } from "react-router-dom";
import { hasPermission } from "../../auth";
import { useAuth } from "../../hooks";

const EditButton = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { account, signOut } = useAuth();

  const isAuthenticated = !signOut;
  const canEdit = isAuthenticated && hasPermission(account.role, "edit");

  if (!canEdit) return null;

  return (
    <button
      onClick={() => navigate(`/blog/${slug}/edit`)}
      className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Edit
    </button>
  );
};

export default EditButton;
