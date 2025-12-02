// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchRestaurants,
//   filterRestaurants,
// } from "../features/users/usersSlice";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { restaurants = [], filteredRestaurants = [], loading, error } = useSelector(
//     (state) => state.users
//   );

//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");

//   // Extract unique categories from restaurants list
//   const categories = useMemo(() => {
//     const cats = restaurants.map((r) => r.category).filter(Boolean);
//     return [...new Set(cats)];
//   }, [restaurants]);

//   useEffect(() => {
//     dispatch(fetchRestaurants());
//   }, [dispatch]);

//   // Filter restaurants based on categoryFilter
//   const displayedRestaurants = useMemo(() => {
//     let filtered = filteredRestaurants.length > 0 ? filteredRestaurants : restaurants;
//     if (categoryFilter) {
//       filtered = filtered.filter((r) => r.category === categoryFilter);
//     }
//     return filtered;
//   }, [restaurants, filteredRestaurants, categoryFilter]);

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     setCategoryFilter("");
//     dispatch(filterRestaurants(value));
//   };

//   const handleCategorySelect = (category) => {
//     setCategoryFilter(category);
//     setSearchTerm("");
//     dispatch(filterRestaurants(""));
//   };

//   const handleCardClick = (id) => {
//     navigate(`/hotel/${id}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-red-100 via-pink-50 to-yellow-50 px-6 py-12 font-sans">
//       <div className="mx-auto max-w-7xl">
//         <h2 className="mb-10 text-4xl font-extrabold text-red-700 tracking-tight drop-shadow-lg">
//           Discover Restaurants Near You
//         </h2>

//         <input
//           type="text"
//           placeholder="Search restaurants by name"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className="mb-6 w-full max-w-3xl rounded-full border-2 border-red-600 bg-white/80 px-6 py-4 text-xl font-medium text-gray-900 shadow-md placeholder-gray-400 transition focus:border-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none"
//         />

//         <div className="mb-10 flex flex-wrap gap-4">
//           <button
//             onClick={() => handleCategorySelect("")}
//             className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
//               categoryFilter === ""
//                 ? "bg-red-600 text-white shadow-lg"
//                 : "bg-white text-red-700 hover:bg-red-100"
//             }`}
//           >
//             All Categories
//           </button>
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => handleCategorySelect(category)}
//               className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
//                 categoryFilter === category
//                   ? "bg-red-600 text-white shadow-lg"
//                   : "bg-white text-red-700 hover:bg-red-100"
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {loading && (
//           <p className="mt-10 text-center text-xl text-gray-500 animate-pulse">
//             Loading restaurants...
//           </p>
//         )}
//         {error && (
//           <p className="mt-10 text-center text-xl text-red-600 font-semibold">
//             Error: {error}
//           </p>
//         )}

//         <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {displayedRestaurants.length > 0 ? (
//             displayedRestaurants.map((restaurant) => (
//               <div
//                 key={restaurant._id}
//                 role="button"
//                 tabIndex={0}
//                 onClick={() => handleCardClick(restaurant._id)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     handleCardClick(restaurant._id);
//                   }
//                 }}
//                 className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
//               >
//                 <div className="relative h-56 w-full overflow-hidden rounded-t-3xl bg-gray-100">
//                   <img
//                     src={
//                       restaurant.image ||
//                       `https://source.unsplash.com/600x450/?restaurant,food&${restaurant._id}`
//                     }
//                     alt={restaurant.name}
//                     className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//                     loading="lazy"
//                     decoding="async"
//                   />
//                   <div
//                     aria-hidden="true"
//                     className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
//                   />
//                   <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
//                     <h3 className="text-xl font-bold">{restaurant.name}</h3>
//                   </div>
//                 </div>

//                 <div className="p-5">
//                   <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
//                     Cuisine
//                   </p>
//                   <p className="mt-1 text-gray-700 line-clamp-1">
//                     {restaurant.category}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             !loading &&
//             !error && (
//               <p className="col-span-full mt-14 text-center text-xl text-gray-400">
//                 No restaurants found.
//               </p>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurants,
  filterRestaurants,
} from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { restaurants = [], filteredRestaurants = [], loading, error } = useSelector(
    (state) => state.users
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const categories = useMemo(() => {
    const cats = restaurants.map((r) => r.category).filter(Boolean);
    return [...new Set(cats)];
  }, [restaurants]);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const displayedRestaurants = useMemo(() => {
    let filtered = filteredRestaurants.length > 0 ? filteredRestaurants : restaurants;
    if (categoryFilter) {
      filtered = filtered.filter((r) => r.category === categoryFilter);
    }
    return filtered;
  }, [restaurants, filteredRestaurants, categoryFilter]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCategoryFilter("");
    dispatch(filterRestaurants(value));
  };

  const handleCategorySelect = (category) => {
    setCategoryFilter(category);
    setSearchTerm("");
    dispatch(filterRestaurants(""));
  };

  const handleCardClick = (id) => {
    navigate(`/hotel/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-tr from-red-100 via-pink-50 to-yellow-50 px-6 py-12 font-sans pt-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-4xl font-extrabold text-red-700 tracking-tight drop-shadow-lg">
            Discover Restaurants Near You
          </h2>

          <input
            type="text"
            placeholder="Search restaurants by name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-6 w-full max-w-3xl rounded-full border-2 border-red-600 bg-white/80 px-6 py-4 text-xl font-medium text-gray-900 shadow-md placeholder-gray-400 transition focus:border-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none"
          />

          <div className="mb-10 flex flex-wrap gap-4">
            <button
              onClick={() => handleCategorySelect("")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                categoryFilter === ""
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-white text-red-700 hover:bg-red-100"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  categoryFilter === category
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-white text-red-700 hover:bg-red-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading && (
            <p className="mt-10 text-center text-xl text-gray-500 animate-pulse">
              Loading restaurants...
            </p>
          )}
          {error && (
            <p className="mt-10 text-center text-xl text-red-600 font-semibold">
              Error: {error}
            </p>
          )}

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedRestaurants.length > 0 ? (
              displayedRestaurants.map((restaurant) => (
                <div
                  key={restaurant._id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCardClick(restaurant._id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCardClick(restaurant._id);
                    }
                  }}
                  className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="relative h-56 w-full overflow-hidden rounded-t-3xl bg-gray-100">
                    <img
                      src={
                        restaurant.image ||
                        `https://source.unsplash.com/600x450/?restaurant,food&${restaurant._id}`
                      }
                      alt={restaurant.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                    />
                    <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
                      <h3 className="text-xl font-bold">{restaurant.name}</h3>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
                      Cuisine
                    </p>
                    <p className="mt-1 text-gray-700 line-clamp-1">
                      {restaurant.category}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              !loading &&
              !error && (
                <p className="col-span-full mt-14 text-center text-xl text-gray-400">
                  No restaurants found.
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
