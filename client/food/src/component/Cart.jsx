import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  saveLastOrder,
  incrementItem,
  decrementItem,
  clearLastOrder,
} from "../features/users/cartSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, totalAmount, totalItems, restaurantName, lastOrder } =
    useSelector((state) => state.cart);

  const [success, setSuccess] = useState(false);
  const [eta, setEta] = useState(null);
  const [formError, setFormError] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    paymentMode: "COD",
  });
  const timeoutRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("savedAddresses");
    if (saved) {
      setSavedAddresses(JSON.parse(saved));
      if (JSON.parse(saved).length > 0 && !selectedAddressId) {
        setSelectedAddressId(JSON.parse(saved)[0].id);
      }
    }
  }, []);

  const entries = Object.values(items);

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const validateNewAddress = () => {
    if (!newAddress.name.trim()) return "Please enter your name.";
    if (!newAddress.phone.trim()) return "Please enter your mobile number.";
    if (!newAddress.address.trim()) return "Please enter delivery address.";
    return "";
  };

  const saveAddress = () => {
    const err = validateNewAddress();
    if (err) {
      setFormError(err);
      return;
    }

    const addressId = Date.now().toString();
    const addressObj = { id: addressId, ...newAddress };

    const updatedAddresses = [addressObj, ...savedAddresses];
    setSavedAddresses(updatedAddresses);
    localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));

    setSelectedAddressId(addressId);
    setNewAddress({
      name: "",
      phone: "",
      address: "",
      landmark: "",
      paymentMode: "COD",
    });
    setShowAddressForm(false);
    setFormError("");
  };

  const deleteAddress = (id) => {
    const updatedAddresses = savedAddresses.filter((addr) => addr.id !== id);
    setSavedAddresses(updatedAddresses);
    localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));

    if (selectedAddressId === id) {
      setSelectedAddressId("");
    }
  };

  const getSelectedAddress = () => {
    return savedAddresses.find((addr) => addr.id === selectedAddressId);
  };

  const handlePurchase = () => {
    if (entries.length === 0) return;

    const selectedAddr = getSelectedAddress();
    if (!selectedAddr) {
      setFormError("Please select or add a delivery address.");
      return;
    }
    setFormError("");

    const min = 25;
    const max = 40;
    const randomMinutes = Math.floor(Math.random() * (max - min + 1)) + min;
    const placedAt = Date.now();

    dispatch(
      saveLastOrder({
        items,
        totalAmount,
        restaurantName,
        placedAt,
        etaMinutes: randomMinutes,
        deliveryDetails: selectedAddr,
      })
    );

    setEta(randomMinutes);
    setSuccess(true);
    dispatch(clearCart());
  };

  const clearTimeoutRef = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const remainingMinutes = useMemo(() => {
    if (!lastOrder) return null;
    const { placedAt, etaMinutes } = lastOrder;
    if (!placedAt || !etaMinutes) return null;

    const elapsedMs = Date.now() - placedAt;
    const elapsedMin = Math.floor(elapsedMs / 60000);
    const remaining = etaMinutes - elapsedMin;

    clearTimeoutRef();

    if (remaining <= 0) {
      timeoutRef.current = setTimeout(() => {
        dispatch(clearLastOrder());
      }, 30000);
      return 0;
    }

    return remaining > 0 ? remaining : 0;
  }, [lastOrder, dispatch, clearTimeoutRef]);

  const lastOrderEntries = useMemo(() => {
    if (!lastOrder?.items) return [];
    return Object.values(lastOrder.items);
  }, [lastOrder]);

  useEffect(() => {
    return () => {
      clearTimeoutRef();
    };
  }, [clearTimeoutRef]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 sm:py-16">
      <div className="mx-auto max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm font-semibold text-orange-600 hover:underline"
        >
          ← Back
        </button>

        <h1 className="mb-3 text-3xl font-extrabold text-gray-900">
          Your Cart
        </h1>

        {restaurantName && totalItems > 0 && (
          <p className="mb-4 text-sm text-gray-600">From: {restaurantName}</p>
        )}
        <p className="mb-6 text-xs text-gray-500">
          Items in cart: {totalItems}
        </p>

        {lastOrder && remainingMinutes === 0 && (
          <section className="mb-8 rounded-lg bg-blue-50 p-5 text-sm text-blue-900 shadow border border-blue-200">
            <h2 className="mb-2 font-semibold text-blue-800">
              ✅ Your order is delivered!
            </h2>
            <div className="mt-2 p-3 bg-blue-100 rounded-lg">
              <p className="font-medium text-blue-800">
                Delivered to: {lastOrder.deliveryDetails?.name}
              </p>
              <p className="text-sm text-blue-700">
                {lastOrder.deliveryDetails?.address}
                {lastOrder.deliveryDetails?.landmark &&
                  `, ${lastOrder.deliveryDetails.landmark}`}
              </p>
            </div>
            <button
              onClick={() => {
                dispatch(clearLastOrder());
              }}
              className="mt-3 rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
            >
              New Order →
            </button>
          </section>
        )}

        {lastOrder && remainingMinutes > 0 && (
          <section className="mb-8 rounded-lg bg-emerald-50 p-5 text-sm text-emerald-900 shadow">
            <h2 className="mb-2 font-semibold text-emerald-800">
              Current order in progress
            </h2>
            <p>
              Outlet:{" "}
              <span className="font-medium">
                {lastOrder.restaurantName || "Restaurant"}
              </span>
            </p>
            <p>Order amount: ₹{lastOrder.totalAmount}</p>

            <div className="mt-2 text-emerald-800 bg-emerald-100 p-3 rounded-lg">
              <p className="font-medium">
                Deliver to: {lastOrder.deliveryDetails?.name}(
                {lastOrder.deliveryDetails?.phone})
              </p>
              <p>📍 {lastOrder.deliveryDetails?.address}</p>
              {lastOrder.deliveryDetails?.landmark && (
                <p>🏪 {lastOrder.deliveryDetails.landmark}</p>
              )}
              <p>💳 {lastOrder.deliveryDetails?.paymentMode}</p>
            </div>

            <p className="mt-3 text-emerald-700 font-semibold">
              ⏱️ Estimated delivery in about {remainingMinutes} minutes.
            </p>

            <div className="mt-5 rounded border border-emerald-300 bg-emerald-100 p-4">
              <p className="mb-2 font-semibold text-emerald-700">
                You ordered:
              </p>
              <ul className="space-y-1 text-emerald-900">
                {lastOrderEntries.map(({ item, qty }) => (
                  <li key={item.itemId} className="flex justify-between">
                    <span>
                      {item.itemName}{" "}
                      <span className="text-xs font-normal">× {qty}</span>
                    </span>
                    <span className="font-semibold">
                      ₹{qty * (item.price || 0)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {success && (
          <div className="mb-8 flex items-start gap-4 rounded-md border border-green-300 bg-green-50 px-6 py-4 text-sm text-green-800 shadow-md">
            <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
              ✓
            </span>
            <div>
              <p className="font-semibold">
                Order placed successfully! Your food is on the way.
              </p>
              {eta && (
                <p className="text-xs text-green-900">
                  ⏱️ Estimated delivery in{" "}
                  <span className="font-semibold">{eta} minutes</span>.
                </p>
              )}
            </div>
          </div>
        )}

        {entries.length === 0 ? (
          <div className="rounded-lg bg-white p-6 text-center text-sm text-gray-500 shadow">
            {savedAddresses.length > 0 ? (
              <>
                <h2 className="mb-4 text-lg font-semibold text-gray-800">
                  Saved Addresses Ready! 🚚
                </h2>
                <p className="mb-4">Add items to order at saved addresses!</p>
              </>
            ) : (
              <>
                <h2 className="mb-4 text-lg font-semibold text-gray-800">
                  No saved addresses
                </h2>
                <p>Add your first delivery address below</p>
              </>
            )}
          </div>
        ) : (
          <>
            <section className="mb-8 rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-gray-800">
                  📍 Choose Delivery Address
                </h2>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="text-sm text-orange-600 hover:underline font-medium flex items-center gap-1"
                >
                  + Add New Address
                </button>
              </div>

              {formError && (
                <p className="mb-4 text-sm text-red-600">{formError}</p>
              )}

              {savedAddresses.length > 0 && (
                <div className="mb-6">
                  <div className="grid gap-3 max-h-48 overflow-y-auto">
                    {savedAddresses.map((address) => (
                      <div
                        key={address.id}
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${
                          selectedAddressId === address.id
                            ? "border-orange-500 bg-orange-50 shadow-md"
                            : "border-gray-200 hover:border-orange-300 hover:shadow-sm"
                        }`}
                        onClick={() => setSelectedAddressId(address.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">
                              {address.name}
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                              {address.address}
                            </p>
                            {address.landmark && (
                              <p className="text-xs text-gray-600 mt-1">
                                🏪 {address.landmark}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                              📱 {address.phone} | 💳 {address.paymentMode}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-3">
                            {selectedAddressId === address.id && (
                              <span className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  ✓
                                </span>
                              </span>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteAddress(address.id);
                              }}
                              className="text-xs text-red-500 hover:text-red-700 p-1 -m-1 rounded-full hover:bg-red-50"
                              title="Delete address"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedAddressId && (
                <div className="flex gap-3 mb-6 p-3 bg-blue-50 rounded-lg">
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex-1 text-xs font-medium text-blue-700 hover:text-blue-900 py-2 px-3 rounded-lg hover:bg-blue-100"
                  >
                    ✏️ Edit Address
                  </button>
                  <button
                    onClick={handlePurchase}
                    className="flex-1 bg-orange-500 text-white text-xs font-semibold py-2 px-3 rounded-lg hover:bg-orange-600"
                  >
                    🚚 Use This Address
                  </button>
                </div>
              )}
            </section>

            {showAddressForm && (
              <section className="mb-8 rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  ➕ Add New Address
                </h3>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <label className="mb-1 text-xs font-medium text-gray-700">
                      Name *
                    </label>
                    <input
                      name="name"
                      value={newAddress.name}
                      onChange={handleNewAddressChange}
                      placeholder="Rahul Kumar"
                      className="rounded border border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-1 text-xs font-medium text-gray-700">
                      Mobile Number *
                    </label>
                    <input
                      name="phone"
                      value={newAddress.phone}
                      onChange={handleNewAddressChange}
                      placeholder="9876543210"
                      className="rounded border border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
                    />
                  </div>

                  <div className="flex flex-col sm:col-span-2">
                    <label className="mb-1 text-xs font-medium text-gray-700">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={newAddress.address}
                      onChange={handleNewAddressChange}
                      rows={3}
                      placeholder="House no, street, area, city"
                      className="resize-none rounded border border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-1 text-xs font-medium text-gray-700">
                      Landmark (Optional)
                    </label>
                    <input
                      name="landmark"
                      value={newAddress.landmark}
                      onChange={handleNewAddressChange}
                      placeholder="Near temple, mall etc."
                      className="rounded border border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-1 text-xs font-medium text-gray-700">
                      Payment Mode
                    </label>
                    <select
                      name="paymentMode"
                      value={newAddress.paymentMode}
                      onChange={handleNewAddressChange}
                      className="rounded border border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
                    >
                      <option value="COD">Cash on Delivery</option>
                      <option value="UPI">UPI</option>
                      <option value="CARD">Card on Delivery</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={saveAddress}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700"
                  >
                    💾 Save Address
                  </button>
                  <button
                    onClick={() => setShowAddressForm(false)}
                    className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </section>
            )}

            <section className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
              <ul className="divide-y divide-gray-200 text-sm">
                {entries.map(({ item, qty }) => (
                  <li
                    key={item.itemId}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.itemName}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Qty: {qty} × ₹{item.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900">
                        ₹{qty * (item.price || 0)}
                      </span>
                      <button
                        onClick={() => dispatch(decrementItem(item.itemId))}
                        className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-600 hover:bg-red-200"
                        aria-label={`Decrease quantity of ${item.itemName}`}
                      >
                        −
                      </button>
                      <button
                        onClick={() => dispatch(incrementItem(item.itemId))}
                        className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-600 hover:bg-green-200"
                        aria-label={`Increase quantity of ${item.itemName}`}
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 text-sm font-semibold text-gray-900">
                <span>Total</span>
                <span className="text-orange-600 text-lg">₹{totalAmount}</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  onClick={handlePurchase}
                  className="rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={!selectedAddressId}
                >
                  {selectedAddressId
                    ? "🚚 Place Order"
                    : "📍 Select Address First"}
                </button>

                <button
                  onClick={() => dispatch(clearCart())}
                  className="rounded-md bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Clear Cart
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
