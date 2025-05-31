import React from 'react';
import { motion } from 'framer-motion';
import { stepsData } from '../assets/assets';

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center justify-center my-32 overflow-hidden"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2 relative z-10 text-white">
        How it Works
      </h1>
      <p className="text-lg text-purple-500 mb-8 relative z-10">
        Transform words into stunning images
      </p>

      <div className="space-y-4 w-full max-w-3xl text-sm relative z-10">
        {stepsData.map((item, index) => (
          <motion.div
              key={index}
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{
    type: 'spring',
    stiffness: 80,
    damping: 14,
    delay: index * 0.2
  }}
  viewport={{ once: true, amount: 0.2 }}
  className="flex items-center gap-4 p-5 px-8 shadow-md border cursor-pointer transition-all duration-300 rounded-lg
             bg-black hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
            <img width={40} src={item.icon} alt="" />
            <div>
              <h2 className="text-xl font-medium text-white">{item.title}</h2>
              <p className="text-gray-200">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
