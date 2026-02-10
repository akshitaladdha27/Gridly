import { Router, Response } from "express";
import { auth, AuthRequest } from "../middleware/auth.js";
import Users from "../models/Users.js";

const router = Router();

router.get("/profile", auth, async (req: AuthRequest, res: Response) => {
  try {
    const { name } = req.body;
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await Users.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
