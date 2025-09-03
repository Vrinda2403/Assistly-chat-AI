import express from "express"
import { login, logout, Signup } from "../controllers/user_control.js"

const router=express.Router()

router.post("/signup",Signup)
router.post("/login",login)
router.get("/logout",logout)

export default router