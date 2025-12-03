// import React from "react";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import Signup from "./component/Signup";
// import Login from "./component/Login";
// import Dashboard from "./component/Dashboard";
// import Hotel from "./component/Hotel";
// import Cart from "./component/Cart";
// import MyOrders from "./component/MyOrders";
// import Profile from "./component/Profile";
// import ProtectedRoute from "./component/ProtectedRoute";
// import { store, persistor } from "./app/store";

// import { BrowserRouter, Routes, Route } from "react-router-dom";

// const App = () => {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/" element={<Login />} />

//             <Route element={<ProtectedRoute />}>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/hotel/:id" element={<Hotel />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/my-orders" element={<MyOrders />} />
//               <Route path="/profile" element={<Profile />} />
//             </Route>

//             <Route path="*" element={<p>Page not found</p>} />
//           </Routes>
//         </BrowserRouter>
//       </PersistGate>
//     </Provider>
//   );
// };

// export default App;


import React from "react";
import { Provider } from "react-redux";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import Hotel from "./component/Hotel";
import Cart from "./component/Cart";
import MyOrders from "./component/MyOrders";
import Profile from "./component/Profile";
import ProtectedRoute from "./component/ProtectedRoute";
import { store } from "./app/store";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./component/Footer";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hotel/:id" element={<Hotel />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
