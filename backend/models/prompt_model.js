import mongoose, { Mongoose } from "mongoose";

const promptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Prompt = mongoose.model("Prompt", promptSchema);

export default Prompt; // ✅ default export
