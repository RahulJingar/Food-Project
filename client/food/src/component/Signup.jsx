import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
      (user) => user.email === email || user.number === number
    );
    if (userExists) {
      setMessage("User with this email or number already exists");
      return;
    }

    users.push({ name, number, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Signup successful!");

    setName("");
    setNumber("");
    setEmail("");
    setPassword("");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-10 shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>

        <form className="space-y-6" onSubmit={handleSignup}>
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Name"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="number" className="sr-only">
              Phone Number
            </label>
            <input
              id="number"
              name="number"
              type="tel"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              placeholder="Mobile Number"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-red-600 px-4 py-3 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-4 font-medium ${
              message.includes("successful")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-red-600 font-semibold hover:text-red-800 transition"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
