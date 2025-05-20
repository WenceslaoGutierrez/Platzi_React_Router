import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Account } from "../../types";
import { useAuth } from "../../hooks";

const UserProfile = () => {
    const { slug } = useParams<{ slug: string }>();
    const [user, setUser] = useState<Account | null>(null);
    const { account, signOut } = useAuth();

    useEffect(() => {
      const users = JSON.parse(
        localStorage.getItem("users") || "[]"
      ) as Account[];
      const found = users.find((u) => u.email === slug);
      setUser(found ?? null);
    }, [slug]);

    if (!user) {
      return <p className="text-center mt-8 text-gray-500">User not found</p>;
    }

    const isOwnerOrAdmin = (!signOut && account.email === user.email) || (!signOut && account.role === "admin");

    return (
      <>
        <div className="p-6 max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">Role: {user.role}</p>

          {isOwnerOrAdmin && (
            <div className="mt-6 border-t pt-4">
              <h2 className="text-xl font-semibold mb-2">Private Actions</h2>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </>
    );
}

export default UserProfile;