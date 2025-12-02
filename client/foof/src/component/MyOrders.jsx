import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedUser) {
      // If not logged in, redirect to login page
      navigate("/");
      return;
    }
    setUser(loggedUser);

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = allOrders.filter(order => order.userEmail === loggedUser.email);

    setOrders(userOrders);
  }, [navigate]);

  if (!user) {
    return null; // or loading
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
        <p className="text-gray-600">You have no orders yet.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="mb-6 text-center text-3xl font-bold text-red-700">My Orders</h2>

      <div className="mx-auto max-w-4xl space-y-6">
        {orders.map((order) => (
          <div key={order.orderId} className="rounded-lg border border-gray-300 bg-white p-5 shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                {order.restaurantName}
              </h3>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status.toUpperCase()}
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-1">
              Placed at: {new Date(order.placedAt).toLocaleString()}
            </p>

            {/* Items */}
            <ul className="my-4 border-t border-b border-gray-200 py-3 text-sm">
              {order.items.map(({ item, qty }) => (
                <li key={item.itemId} className="flex justify-between py-1">
                  <span>{item.itemName} × {qty}</span>
                  <span>₹{item.price * qty}</span>
                </li>
              ))}
            </ul>

            <p className="text-right font-semibold text-lg text-red-600">
              Total: ₹{order.totalAmount}
            </p>

            {/* Delivery details */}
            <div className="mt-4 rounded border border-gray-200 bg-gray-50 p-3 text-sm">
              <p><strong>Deliver to:</strong> {order.deliveryDetails.name} ({order.deliveryDetails.phone})</p>
              <p><strong>Address:</strong> {order.deliveryDetails.address}</p>
              {order.deliveryDetails.landmark && <p><strong>Landmark:</strong> {order.deliveryDetails.landmark}</p>}
              <p><strong>Payment mode:</strong> {order.deliveryDetails.paymentMode}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
