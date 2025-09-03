import dotenv from "dotenv";
dotenv.config();

// Log once to be sure env loads
console.log("Loaded JWT_PASS from env:", process.env.JWT_PASS);

export const JWT_PASS = process.env.JWT_PASS;
export const MONGODB_URI = process.env.MONGODB_URI;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
