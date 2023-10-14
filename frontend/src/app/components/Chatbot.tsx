import React from 'react';
import 'daisyui/dist/full.css'; // Import Daisy UI styles

const Chatbot = () => {
  return (
    <div className=" left-0 right-0 bg-white shadow-lg rounded-t-lg overflow-hidden w-80 h-screen/2">
      {/* Header of the Chatbot */}
      <div className="bg-indigo-500 text-white p-4">
        <h2 className="text-2xl font-semibold">Chatbot</h2>
        <p className="text-sm">Ask me a question...</p>
      </div>

      {/* Chat area */}
      <div className="p-4">
        {/* Chatbot's message */}
        <div className="flex justify-start mb-4">
          <div className="bg-indigo-100 rounded-lg p-2">
            <p className="text-sm">Hello! How can I assist you?</p>
          </div>
        </div>

        {/* User's message */}
        <div className="flex justify-end">
          <div className="bg-gray-100 rounded-lg p-2">
            <p className="text-sm">Can you provide me with information about...</p>
          </div>
        </div>
      </div>

      {/* Message input area */}
      <div className="bg-gray-200 p-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <button className="mt-2 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
