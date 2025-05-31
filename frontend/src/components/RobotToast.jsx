import { motion } from "framer-motion";
import { BotIcon as Robot } from "lucide-react";

export const RobotToast = ({ message }) => (
  <div className="flex items-center gap-3 bg-[#1a1a2e] text-white px-3 py-2 rounded-md shadow-lg w-full max-w-[260px]">
    <motion.div
      className="w-10 h-10"
      animate={{
        y: [0, -6, 0, 6, 0],
        x: [0, 3, 0, -3, 0],
        rotate: [6, 11, 6, 1, 6],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <div className="rounded-full p-2 w-10 h-10 flex items-center justify-center">
        <Robot className="text-purple-500 w-full h-full" />
      </div>
    </motion.div>
    <p className="text-xs font-medium leading-tight">{message}</p>
  </div>
);
