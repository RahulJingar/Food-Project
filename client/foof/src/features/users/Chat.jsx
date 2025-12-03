import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateInputText, addUserMessage, addBotReply } from "./chatSlice";
import { getBotResponse } from "./logic";

const Chat = () => {
  const dispatch = useDispatch();
  const { messages, inputText } = useSelector((state) => state.chat);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    dispatch(updateInputText(e.target.value));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    dispatch(addUserMessage(inputText.trim()));

    setTimeout(() => {
      const botReply = getBotResponse(inputText.trim());
      dispatch(addBotReply(botReply));
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            🤖
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">FoodHub Bot</h3>
            <p className="text-orange-100 text-sm">Online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                message.sender === "user"
                  ? "bg-orange-500 text-white rounded-br-sm"
                  : "bg-white border border-gray-200 shadow-sm"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-200"
      >
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent max-h-20"
            rows={1}
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-12 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ➤
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
