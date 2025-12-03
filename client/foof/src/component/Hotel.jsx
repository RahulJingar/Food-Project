import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchRestaurants } from "../features/users/usersSlice";
import {
  addToCart,
  incrementItem,
  decrementItem,
  setRestaurantName,
} from "../features/users/cartSlice";
import Navbar from "./Navbar";

const Hotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { restaurants, loading, error } = useSelector((state) => state.users);

  const cart = useSelector((state) => state.cart);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("priceAsc");

  useEffect(() => {
    if (restaurants.length === 0) {
      dispatch(fetchRestaurants());
    }
  }, [dispatch, restaurants.length]);

  const restaurant = restaurants.find((r) => r._id === id);

  useEffect(() => {
    if (restaurant?.name) {
      dispatch(setRestaurantName(restaurant.name));
    }
  }, [restaurant, dispatch]);

  const filteredAndSortedItems = useMemo(() => {
    if (!restaurant?.items) return [];
    let items = [...restaurant.items];

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((item) => item.itemName.toLowerCase().includes(q));
    }

    if (sortBy === "priceAsc") {
      items.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "priceDesc") {
      items.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "nameAsc") {
      items.sort((a, b) => a.itemName.localeCompare(b.itemName));
    }

    return items;
  }, [restaurant, search, sortBy]);

  if (loading)
    return (
      <p className="mt-10 text-center text-gray-700 text-lg font-semibold">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="mt-10 text-center text-red-600 text-lg font-semibold">
        Error: {error}
      </p>
    );
  if (!restaurant)
    return (
      <p className="mt-10 text-center text-gray-700 text-lg font-semibold">
        Restaurant not found
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <Navbar />
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-3xl overflow-hidden shadow-lg relative h-64">
          <img
            src={
              restaurant.image ||
              `https://source.unsplash.com/900x400/?restaurant,food&${restaurant._id}`
            }
            alt={restaurant.name}
            className="h-full w-full object-cover brightness-90 transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
            <h1 className="text-4xl font-extrabold">{restaurant.name}</h1>
            <p className="mt-1 text-lg font-semibold">{restaurant.category}</p>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            placeholder="Search menu items"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xs rounded-full border border-gray-300 px-5 py-3 text-sm text-gray-900 shadow-sm placeholder-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full max-w-xs rounded-full border border-gray-300 px-5 py-3 text-sm text-gray-900 shadow-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
          >
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="nameAsc">Name: A to Z</option>
          </select>
        </div>

        {filteredAndSortedItems.length === 0 ? (
          <p className="text-center text-gray-500">
            No items match your search.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedItems.map((item) => {
              const entry = cart.items[item.itemId];
              const qty = entry?.qty || 0;

              return (
                <li
                  key={item.itemId}
                  className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition shadow-gray-300 hover:shadow-orange-400"
                >
                  <div className="relative h-44 w-full overflow-hidden rounded-t-xl">
                    <img
                      src={
                        item.image ||
                        `https://source.unsplash.com/320x180/?food,meal&${item.itemId}`
                      }
                      alt={item.itemName}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.itemName}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-orange-600 font-bold text-lg">
                        ₹{item.price}
                      </span>
                      {qty === 0 ? (
                        <button
                          onClick={() => dispatch(addToCart(item))}
                          className="rounded-full bg-orange-600 px-4 py-1 text-xs font-semibold text-white shadow hover:bg-orange-700"
                        >
                          Add
                        </button>
                      ) : (
                        <div className="inline-flex items-center rounded-full border border-orange-500 bg-white text-sm font-semibold text-orange-600 shadow">
                          <button
                            onClick={() => dispatch(decrementItem(item.itemId))}
                            className="px-3 py-1 hover:bg-orange-50 rounded-l-full"
                          >
                            −
                          </button>
                          <span className="border-x border-orange-500 px-4 py-1">
                            {qty}
                          </span>
                          <button
                            onClick={() => dispatch(incrementItem(item.itemId))}
                            className="px-3 py-1 hover:bg-orange-50 rounded-r-full"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Hotel;
