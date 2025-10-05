import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { signJwt } from "../utils/jwt";

const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response) => {
  const { name, email, phone, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email already registered" });
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ name, email, phone, password: hashed });
    await user.save();

    const token = signJwt({ id: user._id, email: user.email });
    return res.status(201)
      .json({
        user: { id: user._id, name: user.name, email: user.email },
        token,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signJwt({ id: user._id, email: user.email });
    return res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
