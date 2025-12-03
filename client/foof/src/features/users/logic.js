import { store } from "../../app/store";

export const getBotResponse = (userInput) => {
  const input = userInput.toLowerCase().trim();

  if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
    return "Namaste! Aaj kya khane ka mood hai? 🍕🍔";
  }
  if (input.includes('pizza')) {
    return "🍕 Paneer Pizza ₹199, Chicken Pizza ₹249. Cart mein add karo!";
  }
  if (input.includes('burger')) {
    return "🍔 Chicken Burger ₹149, Veg Burger ₹129. + button se quantity badhao!";
  }
  if (input.includes('delivery') || input.includes('time')) {
    return "🚚 25-40 minutes mein delivery. Cart page pe live ETA countdown!";
  }
  if (input.includes('payment') || input.includes('cod')) {
    return "💳 COD, UPI, Card - sab options available!";
  }
  if (input.includes('address') || input.includes('delivery address')) {
    return "📍 Cart page pe 'New Address →' button click karo!";
  }
  if (input.includes('order') || input.includes('track')) {
    return "👀 Cart page pe 'Current order in progress' section dekho!";
  }
  if (input.includes('discount') || input.includes('coupon')) {
    return "🎉 FIRST50 coupon use karo - 50% OFF first order!";
  }
  if (input.includes('menu') || input.includes('veg')) {
    return "🌱 Veg Menu: Paneer Tikka ₹169, Veg Biryani ₹199";
  }
  if (input.includes('cancel')) {
    return "❌ Clear Cart button click karo ya nayi items add karo!";
  }
  if (input.includes('thanks') || input.includes('thank')) {
    return "🙏 Khushi hui! Aur order ke liye welcome! 😊";
  }

  const responses = [
    "Bilkul! Cart mein items add karo aur purchase karo!",
    "Haan ji! Koi bhi item chahiye to menu check karo!",
    "Ready hai! Address daalo aur order place kar do!",
    "Perfect! Abhi cart check karo live status ke liye!",
    "Theek hai! Koi aur help chahiye?",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};
