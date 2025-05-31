import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="relative pb-16 text-center overflow-hidden"
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-white py-6 md:py-16 relative z-10"
      >
        See the magic. Try now
      </motion.h1>

      {/* Button */}
      <motion.button
        onClick={onClickHandler}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-12 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white m-auto hover:scale-105 transition-all duration-500 relative z-10 shadow-lg"
      >
        Generate Images
        <img src={assets.star_group} alt="" className="h-6" />
      </motion.button>

      {/* Optional: Keep twinkle style if stars are re-enabled later */}
      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(1); }
            100% { opacity: 0.8; transform: scale(1.2); }
          }
        `}
      </style>
    </motion.div>
  );
};

export default GenerateBtn;
