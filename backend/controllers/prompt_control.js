import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import Prompt from '../models/prompt_model.js'; // ensure default export

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const sendPrompt = async (req, res) => {
  const { content } = req.body;
  const userId=req.userId;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Save user prompt to DB
    await Prompt.create({
      userId,
      role: "user",
      content,
    });

    let responseText;

    try {
      // Try gemini-1.5-pro first
      const proModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await proModel.generateContent(content);
      responseText = result.response.text();
    } catch (err) {
      // If quota exceeded or not available, fallback to flash
      if (err.message.includes("Too Many Requests") || err.message.includes("quota")) {
        console.warn("⚠️ Quota exceeded on pro → switching to flash...");
        const flashModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await flashModel.generateContent(content);
        responseText = result.response.text();
      } else {
        throw err; // rethrow other errors
      }
    }

    // Save Gemini's response to DB
    await Prompt.create({
      userId,
      role: "assistant",
      content: responseText,
    });

    return res.status(200).json({ reply: responseText });
  } catch (error) {
    console.error("Gemini API or DB error:", error.message || error);
    return res.status(500).json({ error: "Failed to process prompt" });
  }
};
