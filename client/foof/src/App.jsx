// import React from "react";
// import Signup from "./component/Signup";
// import Login from "./component/Login";
// import Dashboard from "./component/Dashboard";
// import Hotel from "./component/Hotel";
// // import CartPage from "./component/CartPage"; // NEW
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Cart from "./component/Cart";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/hotel/:id" element={<Hotel />} />
//         <Route path="/cart" element={<Cart />} /> {/* NEW */}
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
import React from "react";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import Hotel from "./component/Hotel";
import Cart from "./component/Cart";
import ProtectedRoute from "./component/ProtectedRoute"; // naya

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyOrders from "./component/MyOrders";
import Profile from "./component/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />

        {/* Protected Routes as children of ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hotel/:id" element={<Hotel />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders/>} />
          <Route path="/profile" element={<Profile/>} />

          {/* Add other protected routes here */}
        </Route>

        {/* Optional: 404 Not Found route */}
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
