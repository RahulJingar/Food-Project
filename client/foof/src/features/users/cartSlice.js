import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
  totalItems: 0,
  totalAmount: 0,
  restaurantName: "",
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
    saveLastOrder(state, action) {
      state.lastOrder = action.payload;
    },
    clearCart(state) {
      state.items = {};
      state.totalItems = 0;
      state.totalAmount = 0;
      state.restaurantName = "";
    },
    clearLastOrder(state) {
      state.lastOrder = null;
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
  clearLastOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
