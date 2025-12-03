import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
    { id: 1, text: "Hi! Welcome to FoodHub Chat", sender: "bot", timestamp: Date.now() },
    { id: 2, text: "Kya khana chahte ho aaj?", sender: "user", timestamp: Date.now() + 1000 },
    { id: 3, text: "Pizza aur burger dono milega?", sender: "bot", timestamp: Date.now() + 2000 },
    { id: 4, text: "Haan bilkul! Paneer Pizza ₹199 aur Chicken Burger ₹149", sender: "user", timestamp: Date.now() + 3000 },
    { id: 5, text: "Delivery kitna time lagega?", sender: "bot", timestamp: Date.now() + 4000 },
    { id: 6, text: "25-40 minutes mein pahunch jayega garam garam!", sender: "user", timestamp: Date.now() + 5000 },
    { id: 7, text: "Order track kaise karu?", sender: "bot", timestamp: Date.now() + 6000 },
    { id: 8, text: "Cart page pe ETA countdown hai live!", sender: "user", timestamp: Date.now() + 7000 },
    { id: 9, text: "COD available hai?", sender: "bot", timestamp: Date.now() + 8000 },
    { id: 10, text: "Haan COD, UPI, Card sab options hai!", sender: "user", timestamp: Date.now() + 9000 },
    { id: 11, text: "Veg menu dikhao", sender: "bot", timestamp: Date.now() + 10000 },
    { id: 12, text: "Paneer Tikka, Veg Biryani available", sender: "user", timestamp: Date.now() + 11000 },
    { id: 13, text: "Minimum order kitna?", sender: "bot", timestamp: Date.now() + 12000 },
    { id: 14, text: "No minimum order! Khushi se order karo", sender: "user", timestamp: Date.now() + 13000 },
    { id: 15, text: "Today's special kya hai?", sender: "bot", timestamp: Date.now() + 14000 },
    { id: 16, text: "Butter Chicken + Naan combo ₹299 only!", sender: "user", timestamp: Date.now() + 15000 },
    { id: 17, text: "Restaurant change kar sakta hu?", sender: "bot", timestamp: Date.now() + 16000 },
    { id: 18, text: "Haan! Menu page se koi bhi restaurant select karo", sender: "user", timestamp: Date.now() + 17000 },
    { id: 19, text: "Discount coupon hai?", sender: "bot", timestamp: Date.now() + 18000 },
    { id: 20, text: "FIRST50 use karo - 50% off first order!", sender: "user", timestamp: Date.now() + 19000 },
    { id: 21, text: "Order cancel kaise karu?", sender: "bot", timestamp: Date.now() + 20000 },
    { id: 22, text: "Clear Cart button ya Support chat", sender: "user", timestamp: Date.now() + 21000 },
    { id: 23, text: "Live order status?", sender: "bot", timestamp: Date.now() + 22000 },
    { id: 24, text: "Cart page pe real-time ETA countdown", sender: "user", timestamp: Date.now() + 23000 },
    { id: 25, text: "New address add kaise karu?", sender: "bot", timestamp: Date.now() + 24000 },
    { id: 26, text: "'New Address →' button click karo", sender: "user", timestamp: Date.now() + 25000 },
    { id: 27, text: "Payment safe hai?", sender: "bot", timestamp: Date.now() + 26000 },
    { id: 28, text: "100% secure payment gateway!", sender: "user", timestamp: Date.now() + 27000 },
    { id: 29, text: "Bulk order kar sakta hu?", sender: "bot", timestamp: Date.now() + 28000 },
    { id: 30, text: "Haan! + button se quantity badhao", sender: "user", timestamp: Date.now() + 29000 },
    { id: 31, text: "Menu suggestions do", sender: "bot", timestamp: Date.now() + 30000 },
    { id: 32, text: "Trending: Biryani + Cold Drink combo", sender: "user", timestamp: Date.now() + 31000 },
    { id: 33, text: "Refunds milega?", sender: "bot", timestamp: Date.now() + 32000 },
    { id: 34, text: "7 days money back guarantee!", sender: "user", timestamp: Date.now() + 33000 },
    { id: 35, text: "App download karu?", sender: "bot", timestamp: Date.now() + 34000 },
    { id: 36, text: "Web app perfect hai! Progressive Web App", sender: "user", timestamp: Date.now() + 35000 },
    { id: 37, text: "Customer care number?", sender: "bot", timestamp: Date.now() + 36000 },
    { id: 38, text: "Chat support 24/7 live hai!", sender: "user", timestamp: Date.now() + 37000 },
    { id: 39, text: "Order history kaha?", sender: "bot", timestamp: Date.now() + 38000 },
    { id: 40, text: "Cart page pe 'Current order in progress'", sender: "user", timestamp: Date.now() + 39000 },
    { id: 41, text: "Fast delivery?", sender: "bot", timestamp: Date.now() + 40000 },
    { id: 42, text: "25 min average delivery time!", sender: "user", timestamp: Date.now() + 41000 },
    { id: 43, text: "Hygiene?", sender: "bot", timestamp: Date.now() + 42000 },
    { id: 44, text: "Contactless delivery + Sanitized packing", sender: "user", timestamp: Date.now() + 43000 },
    { id: 45, text: "Multiple restaurants?", sender: "bot", timestamp: Date.now() + 44000 },
    { id: 46, text: "100+ restaurants nearby!", sender: "user", timestamp: Date.now() + 45000 },
    { id: 47, text: "Loyalty points?", sender: "bot", timestamp: Date.now() + 46000 },
    { id: 48, text: "Every order pe 10 points! Redeem karo", sender: "user", timestamp: Date.now() + 47000 },
    { id: 49, text: "Help needed?", sender: "bot", timestamp: Date.now() + 48000 },
    { id: 50, text: "Chat karte rahiye! 😊", sender: "user", timestamp: Date.now() + 49000 },
  ],
  inputText: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserMessage(state, action) {
      const userMsg = {
        id: Date.now(),
        text: action.payload,
        sender: "user",
        timestamp: Date.now(),
      };
      state.messages.push(userMsg);
      state.inputText = "";
    },
    addBotReply(state, action) {
      const botMsg = {
        id: Date.now() + 1,
        text: action.payload,
        sender: "bot",
        timestamp: Date.now() + 100,
      };
      state.messages.push(botMsg);
    },
    updateInputText(state, action) {
      state.inputText = action.payload;
    },
    clearChat(state) {
      state.messages = [];
    },
  },
});

export const { addUserMessage, addBotReply, updateInputText, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
