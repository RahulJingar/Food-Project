// import React, { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { clearCart, saveLastOrder } from "../features/users/cartSlice";

// const CartPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const {
//     items,
//     totalAmount,
//     totalItems,
//     restaurantName,
//     lastOrder,
//   } = useSelector((state) => state.cart);

//   const [success, setSuccess] = useState(false);
//   const [eta, setEta] = useState(null); // current order ke liye minutes
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     landmark: "",
//     paymentMode: "COD",
//   });
//   const [formError, setFormError] = useState("");

//   const entries = Object.values(items);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     if (!form.name.trim()) return "Please enter your name.";
//     if (!form.phone.trim()) return "Please enter your mobile number.";
//     if (!form.address.trim()) return "Please enter delivery address.";
//     return "";
//   };

//   const handlePurchase = () => {
//     if (entries.length === 0) return;

//     const err = validateForm();
//     if (err) {
//       setFormError(err);
//       return;
//     }
//     setFormError("");

//     // Simple random ETA between 25 and 40 minutes
//     const min = 25;
//     const max = 40;
//     const randomMinutes =
//       Math.floor(Math.random() * (max - min + 1)) + min;

//     const placedAt = Date.now();

//     // snapshot store karo: kya order + delivery detail
//     dispatch(
//       saveLastOrder({
//         items,
//         totalAmount,
//         restaurantName,
//         placedAt,
//         etaMinutes: randomMinutes,
//         deliveryDetails: form,
//       })
//     );

//     setEta(randomMinutes);
//     setSuccess(true);
//     dispatch(clearCart());
//   };

//   // lastOrder ke basis pe remaining time
//   const remainingMinutes = useMemo(() => {
//     if (!lastOrder) return null;
//     const { placedAt, etaMinutes } = lastOrder;
//     if (!placedAt || !etaMinutes) return null;

//     const elapsedMs = Date.now() - placedAt;
//     const elapsedMin = Math.floor(elapsedMs / 60000);
//     const remaining = etaMinutes - elapsedMin;

//     return remaining > 0 ? remaining : 0;
//   }, [lastOrder]);

//   // lastOrder ke items ko array me convert
//   const lastOrderEntries = useMemo(() => {
//     if (!lastOrder?.items) return [];
//     return Object.values(lastOrder.items);
//   }, [lastOrder]);

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-8">
//       <div className="mx-auto max-w-4xl">
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-4 text-sm text-orange-600 hover:underline"
//         >
//           ← Back
//         </button>

//         <h1 className="mb-1 text-2xl font-bold text-gray-900">
//           Your Cart
//         </h1>

//         {restaurantName && totalItems > 0 && (
//           <p className="mb-2 text-sm text-gray-600">
//             From: {restaurantName}
//           </p>
//         )}
//         <p className="mb-4 text-xs text-gray-500">
//           Items in cart: {totalItems}
//         </p>

//         {/* Current order status (jo last time purchase kiya tha) */}
//         {lastOrder && (
//           <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
//             <h2 className="mb-2 text-sm font-semibold text-gray-900">
//               Current order in progress
//             </h2>
//             <p className="text-xs text-gray-600">
//               Outlet:{" "}
//               <span className="font-medium">
//                 {lastOrder.restaurantName || "Restaurant"}
//               </span>
//             </p>
//             <p className="mt-1 text-xs text-gray-600">
//               Order amount: ₹{lastOrder.totalAmount}
//             </p>
//             {lastOrder.deliveryDetails && (
//               <div className="mt-2 text-xs text-gray-600">
//                 <p>
//                   Deliver to:{" "}
//                   <span className="font-medium">
//                     {lastOrder.deliveryDetails?.name}
//                   </span>{" "}
//                   ({lastOrder.deliveryDetails?.phone})
//                 </p>
//                 <p className="mt-0.5">
//                   Address: {lastOrder.deliveryDetails?.address}
//                 </p>
//                 {lastOrder.deliveryDetails?.landmark && (
//                   <p className="mt-0.5">
//                     Landmark: {lastOrder.deliveryDetails.landmark}
//                   </p>
//                 )}
//                 <p className="mt-0.5">
//                   Payment mode:{" "}
//                   {lastOrder.deliveryDetails?.paymentMode}
//                 </p>
//               </div>
//             )}
//             <p className="mt-1 text-xs text-emerald-700">
//               Estimated delivery{" "}
//               {remainingMinutes === null
//                 ? "time calculating..."
//                 : remainingMinutes === 0
//                 ? "any moment now."
//                 : `in about ${remainingMinutes} minutes.`}
//             </p>

//             {/* Last order ke items ka detail list */}
//             {lastOrderEntries.length > 0 && (
//               <div className="mt-3 rounded-lg bg-emerald-50 p-3">
//                 <p className="mb-1 text-xs font-semibold text-emerald-800">
//                   You ordered:
//                 </p>
//                 <ul className="space-y-1 text-xs text-emerald-900">
//                   {lastOrderEntries.map(({ item, qty }) => (
//                     <li
//                       key={item.itemId}
//                       className="flex items-center justify-between"
//                     >
//                       <span>
//                         {item.itemName}{" "}
//                         <span className="text-[11px] text-emerald-700">
//                           × {qty}
//                         </span>
//                       </span>
//                       <span className="font-semibold">
//                         ₹{qty * (item.price || 0)}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Success + ETA message (jab naya order place hua) */}
//         {success && (
//           <div className="mb-4 flex items-start gap-3 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
//             <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
//               ✓
//             </span>
//             <div>
//               <p className="font-semibold">
//                 Order placed successfully! Your food is on the way.
//               </p>
//               {eta && (
//                 <p className="text-xs text-green-900">
//                   Estimated delivery in{" "}
//                   <span className="font-semibold">
//                     {eta} minutes
//                   </span>
//                   . (Time may vary based on traffic and restaurant
//                   preparation.)
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Live cart (jo abhi tak place nahi kiya) */}
//         {entries.length === 0 ? (
//           <div className="mt-6 rounded-xl bg-white p-4 text-sm text-gray-500 shadow-sm">
//             Cart is empty. Add some items from the menu.
//           </div>
//         ) : (
//           <>
//             {/* Delivery details form */}
//             <div className="mb-4 rounded-xl bg-white p-4 shadow-sm">
//               <h2 className="mb-2 text-sm font-semibold text-gray-900">
//                 Delivery details
//               </h2>

//               {formError && (
//                 <p className="mb-2 text-xs text-red-600">
//                   {formError}
//                 </p>
//               )}

//               <div className="grid gap-3 sm:grid-cols-2">
//                 <div className="flex flex-col gap-1">
//                   <label className="text-xs text-gray-700">
//                     Name *
//                   </label>
//                   <input
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
//                     placeholder="Rahul Kumar"
//                   />
//                 </div>

//                 <div className="flex flex-col gap-1">
//                   <label className="text-xs text-gray-700">
//                     Mobile number *
//                   </label>
//                   <input
//                     name="phone"
//                     value={form.phone}
//                     onChange={handleChange}
//                     className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
//                     placeholder="9876543210"
//                   />
//                 </div>

//                 <div className="flex flex-col gap-1 sm:col-span-2">
//                   <label className="text-xs text-gray-700">
//                     Address *
//                   </label>
//                   <textarea
//                     name="address"
//                     value={form.address}
//                     onChange={handleChange}
//                     rows={2}
//                     className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
//                     placeholder="House no, street, area, city"
//                   />
//                 </div>

//                 <div className="flex flex-col gap-1">
//                   <label className="text-xs text-gray-700">
//                     Landmark (optional)
//                   </label>
//                   <input
//                     name="landmark"
//                     value={form.landmark}
//                     onChange={handleChange}
//                     className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
//                     placeholder="Near temple, mall etc."
//                   />
//                 </div>

//                 <div className="flex flex-col gap-1">
//                   <label className="text-xs text-gray-700">
//                     Payment mode
//                   </label>
//                   <select
//                     name="paymentMode"
//                     value={form.paymentMode}
//                     onChange={handleChange}
//                     className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
//                   >
//                     <option value="COD">Cash on Delivery</option>
//                     <option value="UPI">UPI</option>
//                     <option value="CARD">Card on Delivery</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Cart items + totals */}
//             <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
//               <ul className="divide-y divide-gray-100 text-sm">
//                 {entries.map(({ item, qty }) => (
//                   <li
//                     key={item.itemId}
//                     className="flex items-center justify-between py-2"
//                   >
//                     <div>
//                       <p className="font-medium text-gray-800">
//                         {item.itemName}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         Qty: {qty} × ₹{item.price}
//                       </p>
//                     </div>
//                     <span className="text-sm font-semibold text-gray-900">
//                       ₹{qty * (item.price || 0)}
//                     </span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="mt-3 flex items-center justify-between border-t pt-3 text-sm">
//                 <span className="font-semibold text-gray-800">
//                   Total
//                 </span>
//                 <span className="text-base font-bold text-orange-600">
//                   ₹{totalAmount}
//                 </span>
//               </div>

//               <div className="mt-4 flex flex-wrap gap-3">
//                 <button
//                   onClick={handlePurchase}
//                   className="rounded-md bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700"
//                 >
//                   Purchase / Place Order
//                 </button>

//                 <button
//                   onClick={() => dispatch(clearCart())}
//                   className="rounded-md bg-red-500 px-4 py-2 text-xs font-semibold text-white hover:bg-red-600"
//                 >
//                   Clear cart
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, saveLastOrder, incrementItem, decrementItem } from "../features/users/cartSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, totalAmount, totalItems, restaurantName, lastOrder } = useSelector(
    (state) => state.cart
  );

  const [success, setSuccess] = useState(false);
  const [eta, setEta] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    paymentMode: "COD",
  });
  const [formError, setFormError] = useState("");

  const entries = Object.values(items);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.phone.trim()) return "Please enter your mobile number.";
    if (!form.address.trim()) return "Please enter delivery address.";
    return "";
  };

  const handlePurchase = () => {
    if (entries.length === 0) return;

    const err = validateForm();
    if (err) {
      setFormError(err);
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
        deliveryDetails: form,
      })
    );

    setEta(randomMinutes);
    setSuccess(true);
    dispatch(clearCart());
  };

  const remainingMinutes = useMemo(() => {
    if (!lastOrder) return null;
    const { placedAt, etaMinutes } = lastOrder;
    if (!placedAt || !etaMinutes) return null;

    const elapsedMs = Date.now() - placedAt;
    const elapsedMin = Math.floor(elapsedMs / 60000);
    const remaining = etaMinutes - elapsedMin;

    return remaining > 0 ? remaining : 0;
  }, [lastOrder]);

  const lastOrderEntries = useMemo(() => {
    if (!lastOrder?.items) return [];
    return Object.values(lastOrder.items);
  }, [lastOrder]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 sm:py-16">
      <div className="mx-auto max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm font-semibold text-orange-600 hover:underline"
        >
          ← Back
        </button>

        <h1 className="mb-3 text-3xl font-extrabold text-gray-900">Your Cart</h1>

        {restaurantName && totalItems > 0 && (
          <p className="mb-4 text-sm text-gray-600">From: {restaurantName}</p>
        )}
        <p className="mb-6 text-xs text-gray-500">Items in cart: {totalItems}</p>

        {/* Current order status */}
        {lastOrder && (
          <section className="mb-8 rounded-lg bg-emerald-50 p-5 text-sm text-emerald-900 shadow">
            <h2 className="mb-2 font-semibold text-emerald-800">Current order in progress</h2>
            <p>Outlet: <span className="font-medium">{lastOrder.restaurantName || "Restaurant"}</span></p>
            <p>Order amount: ₹{lastOrder.totalAmount}</p>

            {lastOrder.deliveryDetails && (
              <div className="mt-2 text-emerald-800">
                <p>Deliver to: <span className="font-medium">{lastOrder.deliveryDetails?.name}</span> ({lastOrder.deliveryDetails?.phone})</p>
                <p>Address: {lastOrder.deliveryDetails?.address}</p>
                {lastOrder.deliveryDetails?.landmark && <p>Landmark: {lastOrder.deliveryDetails.landmark}</p>}
                <p>Payment mode: {lastOrder.deliveryDetails?.paymentMode}</p>
              </div>
            )}

            <p className="mt-3 text-emerald-700 font-semibold">
              Estimated delivery {" "}
              {remainingMinutes === null ? "time calculating..." :
                remainingMinutes === 0 ? "any moment now." :
                  `in about ${remainingMinutes} minutes.`}
            </p>

            <div className="mt-5 rounded border border-emerald-300 bg-emerald-100 p-4">
              <p className="mb-2 font-semibold text-emerald-700">You ordered:</p>
              <ul className="space-y-1 text-emerald-900">
                {lastOrderEntries.map(({ item, qty }) => (
                  <li key={item.itemId} className="flex justify-between">
                    <span>{item.itemName} <span className="text-xs font-normal">× {qty}</span></span>
                    <span className="font-semibold">₹{qty * (item.price || 0)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Success + ETA message */}
        {success && (
          <div className="mb-8 flex items-start gap-4 rounded-md border border-green-300 bg-green-50 px-6 py-4 text-sm text-green-800 shadow-md">
            <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
              ✓
            </span>
            <div>
              <p className="font-semibold">Order placed successfully! Your food is on the way.</p>
              {eta && (
                <p className="text-xs text-green-900 mt-1">
                  Estimated delivery in <span className="font-semibold">{eta} minutes</span>. (Time may vary based on traffic and restaurant preparation.)
                </p>
              )}
            </div>
          </div>
        )}

        {/* Live cart */}
        {entries.length === 0 ? (
          <div className="rounded-lg bg-white p-6 text-center text-sm text-gray-500 shadow">
            Cart is empty. Add some items from the menu.
          </div>
        ) : (
          <>
            {/* Delivery details form */}
            <section className="mb-8 rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-semibold text-gray-800">Delivery Details</h2>

              {formError && <p className="mb-4 text-sm text-red-600">{formError}</p>}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col">
                  <label className="mb-1 text-xs font-medium text-gray-700">Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Rahul Kumar"
                    className="rounded border border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-xs font-medium text-gray-700">Mobile Number *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="rounded border border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
                  />
                </div>

                <div className="flex flex-col sm:col-span-2">
                  <label className="mb-1 text-xs font-medium text-gray-700">Address *</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="House no, street, area, city"
                    className="resize-none rounded border border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-xs font-medium text-gray-700">Landmark (Optional)</label>
                  <input
                    name="landmark"
                    value={form.landmark}
                    onChange={handleChange}
                    placeholder="Near temple, mall etc."
                    className="rounded border border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-xs font-medium text-gray-700">Payment Mode</label>
                  <select
                    name="paymentMode"
                    value={form.paymentMode}
                    onChange={handleChange}
                    className="rounded border border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
                  >
                    <option value="COD">Cash on Delivery</option>
                    <option value="UPI">UPI</option>
                    <option value="CARD">Card on Delivery</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Cart Items + Controls */}
            <section className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
              <ul className="divide-y divide-gray-200 text-sm">
                {entries.map(({ item, qty }) => (
                  <li key={item.itemId} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-gray-900">{item.itemName}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        Qty: {qty} × ₹{item.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900">₹{qty * (item.price || 0)}</span>
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
                  className="rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Purchase / Place Order
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
