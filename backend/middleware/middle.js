import jwt from "jsonwebtoken";
import { JWT_PASS } from "../routes/config.js";  // ✅ named import

function userMiddleWare(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errors: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_PASS);  // ✅ use named export
    console.log("Decoded JWT:", decoded);

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ errors: "Invalid or expired token" });
  }
}

export default userMiddleWare;
