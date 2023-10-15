import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! How can I assist you?'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // Ajouter le message de l'utilisateur à l'historique
    const newMessages = [...messages, { type: 'user', text: inputMessage }];
    setMessages(newMessages);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: inputMessage })
      });

      const data = await response.json();

      // Ajouter le message du chatbot à l'historique
      newMessages.push({ type: 'bot', text: data.response });
      setMessages(newMessages);

    } catch (error) {
      console.error("Error communicating with backend:", error);
    }

    setInputMessage('');
  };

  return (
    <div className="left-0 right-0 bg-white shadow-lg rounded-t-lg overflow-hidden w-80 h-screen/2">
      <div className="bg-indigo-500 text-white p-4">
        <h2 className="text-2xl font-semibold">Chatbot</h2>
        <p className="text-sm">Ask me a question...</p>
      </div>

      <div className="p-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'bot' ? 'justify-start' : 'justify-end'} mb-4`}>
            <div className={`bg-${message.type === 'bot' ? 'indigo-100' : 'gray-100'} rounded-lg p-2`}>
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-200 p-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="w-full rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-300"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage} className="mt-2 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
