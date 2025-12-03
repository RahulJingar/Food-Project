import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setMessage("Login Successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      setMessage("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-blue-100 to-purple-200 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900 relative">
          Login
         
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-red-600 px-4 py-3 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
          >
            Login
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-red-600 font-semibold hover:text-red-800 transition"
          >
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
  