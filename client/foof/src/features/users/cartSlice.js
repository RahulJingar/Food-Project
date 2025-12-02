import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},          // live cart: { itemId: { item, qty } }
  totalItems: 0,
  totalAmount: 0,
  restaurantName: "",
  // snapshot of last placed order
  // { items, totalAmount, restaurantName, placedAt, etaMinutes }
  lastOrder: null,
};

const recalcTotals = (items) => {
  let totalItems = 0;
  let totalAmount = 0;

  Object.values(items).forEach(({ item, qty }) => {
    totalItems += qty;
    totalAmount += qty * (item.price || 0);
  });

  return { totalItems, totalAmount };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setRestaurantName(state, action) {
      state.restaurantName = action.payload;
    },
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items[item.itemId];
      const qty = existing ? existing.qty + 1 : 1;
      state.items[item.itemId] = { item, qty };

      const { totalItems, totalAmount } = recalcTotals(state.items);
      state.totalItems = totalItems;
      state.totalAmount = totalAmount;
    },
    incrementItem(state, action) {
      const id = action.payload;
      const existing = state.items[id];
      if (!existing) return;
      existing.qty += 1;

      const { totalItems, totalAmount } = recalcTotals(state.items);
      state.totalItems = totalItems;
      state.totalAmount = totalAmount;
    },
    decrementItem(state, action) {
      const id = action.payload;
      const existing = state.items[id];
      if (!existing) return;

      if (existing.qty === 1) {
        delete state.items[id];
      } else {
        existing.qty -= 1;
      }

      const { totalItems, totalAmount } = recalcTotals(state.items);
      state.totalItems = totalItems;
      state.totalAmount = totalAmount;
    },
    // payload: { items, totalAmount, restaurantName, placedAt, etaMinutes }
    saveLastOrder(state, action) {
      state.lastOrder = action.payload;
    },
    clearCart(state) {
      state.items = {};
      state.totalItems = 0;
      state.totalAmount = 0;
      state.restaurantName = "";
    },
  },
});

export const {
  setRestaurantName,
  addToCart,
  incrementItem,
  decrementItem,
  saveLastOrder,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
