import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const navigate = useNavigate();
  const { lastOrder } = useSelector((state) => state.cart);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedUser) {
      navigate("/");
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    
    let updatedOrders = [...allOrders];
    if (lastOrder && !allOrders.find(order => order.placedAt === lastOrder.placedAt)) {
      updatedOrders.unshift({
        ...lastOrder,
        orderId: `ORD-${Date.now()}`,
        status: remainingMinutes(lastOrder) > 0 ? "in-progress" : "delivered",
        userEmail: loggedUser.email,
      });
    }

    setOrders(updatedOrders.filter(order => order.userEmail === loggedUser.email));
    setLoading(false);
  }, [navigate, lastOrder]);

  const remainingMinutes = (order) => {
    if (!order.placedAt || !order.etaMinutes) return 0;
    const elapsedMs = Date.now() - order.placedAt;
    const elapsedMin = Math.floor(elapsedMs / 60000);
    return Math.max(0, order.etaMinutes - elapsedMin);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-700";
      case "in-progress": return "bg-orange-100 text-orange-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">No Orders Yet</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Your first order will appear here. Start ordering from Dashboard!
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="rounded-full bg-orange-600 px-8 py-3 text-white font-semibold hover:bg-orange-700 shadow-lg transform hover:scale-105 transition-all"
        >
          🏪 Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              My Orders
            </h1>
            <p className="text-gray-600 mt-1">Track all your food orders</p>
          </div>
          <span className="text-2xl font-semibold text-gray-800">{orders.length} Orders</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {orders.map((order) => {
            const remMinutes = remainingMinutes(order);
            return (
              <div key={order.orderId || order.placedAt} className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{order.restaurantName}</h3>
                      <p className="text-orange-100 text-sm mt-1 opacity-90">
                        {new Date(order.placedAt).toLocaleString('en-IN', { 
                          dateStyle: 'medium', 
                          timeStyle: 'short' 
                        })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)} bg-opacity-20 backdrop-blur-sm`}>
                      {order.status === "in-progress" && remMinutes > 0 
                        ? `⏱️ ${remMinutes}m`
                        : order.status.toUpperCase()
                      }
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    {Object.values(order.items || {}).map(({ item, qty }) => (
                      <div key={item.itemId} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            🍕
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{item.itemName}</p>
                            <p className="text-sm text-gray-500">× {qty}</p>
                          </div>
                        </div>
                        <span className="font-bold text-orange-600">₹{qty * (item.price || 0)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-orange-600">₹{order.totalAmount}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      📍 Delivery Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">👤</span> {order.deliveryDetails?.name}</p>
                      <p><span className="font-medium">📱</span> {order.deliveryDetails?.phone}</p>
                      <p className="font-medium">📍 {order.deliveryDetails?.address}</p>
                      {order.deliveryDetails?.landmark && (
                        <p><span className="font-medium">🏪</span> {order.deliveryDetails.landmark}</p>
                      )}
                      <p><span className="font-medium">💳</span> {order.deliveryDetails?.paymentMode}</p>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate("/cart")}
                      className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      {remMinutes > 0 ? "📱 Track Live" : "🛒 New Order"}
                    </button>
                    <button className="px-4 py-3 text-gray-500 hover:text-gray-700">
                      ⋮
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
