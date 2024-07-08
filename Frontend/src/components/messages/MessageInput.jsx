import { useState, useRef } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import EmojiPicker from "emoji-picker-react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const audioRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    } else {
      console.error("Audio ref is null");
    }
  };

  const onEmojiClick = (emojiData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  return (
    <div className="px-4 my-3">
      <form className="w-full relative" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <input
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5 bg-purple-200 text-white font-bold border-gray-600"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="button"
            className="ml-2 text-white"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😊
          </button>
          <button type="submit" className="ml-2 flex items-center text-white">
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <BsSend />
            )}
          </button>
        </div>
        {showEmojiPicker && (
          <div className="absolute bottom-full mb-2 right-0">
            <div className="bg-white border rounded-lg shadow-lg p-2">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-gray-500"
                  onClick={() => setShowEmojiPicker(false)}
                >
                  ✖️
                </button>
              </div>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          </div>
        )}
      </form>
      <audio ref={audioRef} src="/send-sound.mp3" />
    </div>
  );
};

export default MessageInput;
