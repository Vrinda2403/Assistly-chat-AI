import express from "express"
import { sendPrompt } from "../controllers/prompt_control.js"
import userMiddleWare from "../middleware/middle.js"

const router=express.Router()

router.post("/prompt",userMiddleWare,sendPrompt)

export default router