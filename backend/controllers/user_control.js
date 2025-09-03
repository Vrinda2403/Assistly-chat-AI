import { user } from "../models/user.js";
import bcrypt from "bcryptjs";
import { JWT_PASS } from "../routes/config.js";   // ✅ named import
import jwt from "jsonwebtoken";

// Signup Function
export const Signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log("Received body:", req.body);

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ errors: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ firstName, lastName, email, password: hashPassword });
    await newUser.save();

    return res.status(201).json({ message: "New user created" });
  } catch (error) {
    console.error("Error in Signup:", error);
    return res.status(500).json({ errors: "Signup Failed" });
  }
};

// Login Function
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(403).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(403).json({ error: "Invalid credentials" });
    }

    // ✅ Use JWT_PASS directly
    const token = jwt.sign({ id: existingUser._id }, JWT_PASS, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };

    res.cookie("jwt", token, cookieOptions);
    return res
      .status(201)
      .json({ message: "User Login Succedded", existingUser, token });
  } catch (error) {
    console.error("Error in Login:", error);
    return res.status(500).json({ error: "Login Failed" });
  }
};

// Logout Function
export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    return res.status(200).json({ message: "Logout succeeded" });
  } catch (error) {
    console.error("Error in logout:", error);
    return res.status(500).json({ errors: "Error in logout" });
  }
};
