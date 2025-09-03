import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRoutes from "./routes/user_routes.js"
import promptRoutes from "./routes/prompt_routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config()
const app = express();
const port=process.env.PORT || 4000;
const MONGO=process.env.MONGODB_URI
//Connection to database
mongoose.connect(MONGO)
  .then(() => console.log("✅ Successfully Connected to DB"))
  .catch((error) => console.error("❌ Connection Error:", error));


app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin:process.env.FRONTEND_URL || "http://localhost:5173",
        credentials:true,
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"]
    })
)
app.use("/api/vl/user",userRoutes)
app.use("/api/vl/gemini",promptRoutes)


app.listen(port ,()=>{
    console.log(`Server is running on ${port}`);
})