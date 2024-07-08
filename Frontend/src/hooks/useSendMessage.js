// src/hooks/useSendMessage.js
import { useState, useContext } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { SocketContext } from "../context/SocketContext"; // Correct import

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { socket } = useContext(SocketContext);

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
      if (socket) {
        socket.emit("newMessage", data); // Emitting the new message event
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
