import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const profilePicUrl =
  "https://img.freepik.com/premium-vector/cute-bee-illustration-bee-kawaii-chibi-vector-drawing-style-bee-cartoon_622550-38.jpg";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-green-300 rounded p-2 py-1 cursor-pointer
          ${isSelected ? "bg-green-300" : ""}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={profilePicUrl} alt="user avatar" />{" "}
            {/* Use profilePicUrl directly */}
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-black">{conversation.fullname}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
