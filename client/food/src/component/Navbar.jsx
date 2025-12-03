import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearCart } from "../features/users/cartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartTotalItems = useSelector((state) => state.cart.totalItems);

  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedUser);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="text-2xl font-bold text-red-600">
          FoodieApp
        </Link>

        <div className="flex items-center space-x-6">
          <button
            onClick={() => navigate("/cart")}
            aria-label="Cart"
            className="relative flex items-center rounded-full bg-red-600 p-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
            </svg>
            {cartTotalItems > 0 && (
              <span className="absolute -top-1 -right-1 rounded-full bg-yellow-400 px-2 text-xs font-bold text-red-900">
                {cartTotalItems}
              </span>
            )}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center rounded-full bg-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-label="User menu"
            >
              <svg
                className="h-7 w-7 text-red-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.667 0 4-2 4-4s-1.333-4-4-4-4 1.333-4 4 1.333 4 4 4zM6 18c0-2 4-3 6-3s6 1 6 3v1H6v-1z" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 text-sm text-gray-700">
                  <p className="px-4 py-2 whitespace-nowrap">
                    <strong>{user?.name || "Guest"}</strong>
                    <br />
                    <span className="text-xs text-gray-400">{user?.email}</span>
                  </p>
                  <hr />
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-red-100"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/my-orders");
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-red-100"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
