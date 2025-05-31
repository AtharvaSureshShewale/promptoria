// historyRoutes.js example
import express from "express";
import HistoryModel from "../models/HistoryModel.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    // req.userId is set by authMiddleware after verifying token
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Find history only for this user
    const history = await HistoryModel.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ success: true, history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
