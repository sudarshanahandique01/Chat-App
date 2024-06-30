import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String, // Corrected to String with capital 'S'
      required: true,
    },
    // createdAt and updatedAt will be automatically added by mongoose when you set timestamps to true
  },
  { timestamps: true }
); // Corrected to timestamps: true

const Message = mongoose.model("Message", messageSchema);
export default Message;
