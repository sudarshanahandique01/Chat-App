import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) return; // Exit early if no selectedConversation

      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        if (res.status === 404) {
          setMessages([]); // Handle 404 case by setting messages to empty array
          return;
        }
        if (!res.ok) {
          throw new Error(
            `Error fetching messages: ${res.status} ${res.statusText}`
          );
        }
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        toast.error(`Error fetching messages: ${error.message}`);
        setMessages([]); // Set messages to empty array on error
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
