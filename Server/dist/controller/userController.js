import * as userService from "../services/userService.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // put in .env
const JWT_EXPIRES_IN = "1d";
// Generate token
const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
// Register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required" });
        const user = await userService.createUser(name, email, password);
        const token = generateToken(user.id);
        res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
// Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.validateUser(email, password);
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });
        const token = generateToken(user.id);
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
