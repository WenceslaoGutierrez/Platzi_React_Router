import { useEffect, useState } from "react";
import type { Account } from "../../types";
import { Link } from "react-router-dom";

const Profile = () =>{
    const [users, setUsers] = useState<Account[]>([]);

    useEffect(() => {
      const stored = localStorage.getItem("users");
      if (stored) {
        setUsers(JSON.parse(stored));
      }
    }, []);

    return (
      <>
        <div className="p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Registered Users</h1>
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user.email}
                className="border p-3 rounded hover:bg-gray-100"
              >
                <Link
                  to={`/profile/${user.email}`}
                  className="text-blue-600 font-medium"
                >
                  {user.name}
                </Link>
                <p className="text-sm text-gray-500">{user.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
}

export default Profile;