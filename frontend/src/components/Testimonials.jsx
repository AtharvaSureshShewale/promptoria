import React from "react";
import { assets, testimonialsData } from "../assets/assets";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-20 py-12"
    >
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-semibold mb-2 text-white"
      >
        Customer Testimonials
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
        className="text-purple-500 mb-12"
      >
        What Our Users Are Saying
      </motion.p>

      <div className="flex flex-wrap gap-6 justify-center">
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            className="p-12 border border-white rounded-[40px] shadow-md w-80 cursor-pointer hover:scale-[1.02] transition-all text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="rounded-full w-14 mb-3"
              />
              <h2 className="text-xl font-semibold text-white">{testimonial.name}</h2>
              <p className="text-white">{testimonial.role}</p>
            </div>

            {/* Star Rating */}
            <div className="flex justify-center mb-4">
              {[...Array(testimonial.stars)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-purple-500 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.538 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.783.57-1.838-.197-1.538-1.118l1.286-3.966a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.966z" />
                </svg>
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-sm text-white">{testimonial.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
