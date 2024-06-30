import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config(); // Load environment variables before using them

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to extract the name, email etc....to parse the incoming request with json payloads
app.use(cookieParser());

// app.get("/", (req, res) => {
//   // Root route http://localhost:5000/
//   res.send("Hello World!!");
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
