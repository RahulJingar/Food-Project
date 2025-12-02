import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedUser);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-500 text-lg font-medium">No user logged in</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-pink-200 via-red-200 to-yellow-100 dark:from-gray-800 dark:via-gray-900 dark:to-black p-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 text-center">
        <h2 className="text-3xl font-extrabold mb-6 text-red-700 dark:text-red-400">
          User Profile
        </h2>

        <div className="space-y-4 text-gray-700 dark:text-gray-300 text-left">
          <div>
            <label className="block text-sm font-semibold mb-1">Name:</label>
            <p className="text-xl font-semibold break-all">{user.name}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email:</label>
            <p className="text-lg break-all">{user.email}</p>
          </div>

          {/* Extra fields chahe to yahan add karo */}
          {user.phone && (
            <div>
              <label className="block text-sm font-semibold mb-1">Phone:</label>
              <p className="text-lg break-all">{user.phone}</p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-10 inline-block rounded-full bg-red-600 px-8 py-3 text-white font-bold shadow-lg hover:bg-red-700 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default Profile;
