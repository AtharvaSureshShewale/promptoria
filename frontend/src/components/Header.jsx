import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { FileText, BotIcon as Robot } from "lucide-react";
import { motion } from "motion/react";
import { delay } from "motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const {user,setShowLogin}=useContext(AppContext);

  const navigate=useNavigate()

  const onClickHandler=()=>{
      if(user){
        navigate('/result')
      }
      else{
        setShowLogin(true)
      }
  }

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Stars background
        <div className="absolute inset-0 z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div> */}
      <main className="relative z-9 flex flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          className="absolute -left-4 top-1/4 transform -rotate-12 opacity-30"
          animate={{
            y: [0, -8, 0, 8, 0],
            x: [0, 4, 0, -4, 0],
            rotate: [-12, -7, -12, -17, -12],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <div className="bg-gray-900 rounded-lg p-4 w-16 h-20">
            <FileText className="text-purple-500 w-full h-full" />
          </div>
        </motion.div>

        <motion.div
          className="absolute right-10 bottom-1/4 transform rotate-12 opacity-30"
          animate={{
            y: [0, -6, 0, 6, 0],
            x: [0, 3, 0, -3, 0],
            rotate: [12, 17, 12, 7, 12],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <div className="bg-gray-900 rounded-lg p-4 w-20 h-24">
            <FileText className="text-purple-500 w-full h-full" />
          </div>
        </motion.div>

        <motion.div
          className="absolute right-20 top-20 transform rotate-6 opacity-30"
          animate={{
            y: [0, -7, 0, 7, 0],
            x: [0, 4, 0, -4, 0],
            rotate: [6, 11, 6, 1, 6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <div className="bg-gray-900 rounded-lg p-4 w-16 h-16">
            <Robot className="text-purple-500 w-full h-full" />
          </div>
        </motion.div>

        <motion.h1 
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.4, duration:2}}
        className="text-5xl md:text-7xl font-bold max-w-4xl mb-6 text-white">
          Transform Your
          <br />
          Text to Image with <br />
          <span
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text"
          >
            AI Power
          </span>
        </motion.h1>

        <motion.p 
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{delay:0.6,duration:0.8}}

        className="text-gray-400 text-xl max-w-2xl mb-12">
          Upload your research papers and let our AI transform them into
          engaging presentations, podcasts, and visual content.
        </motion.p>

        <div className="flex flex-col md:flex-row gap-4">
          <motion.button
          onClick={onClickHandler}
          whileHover={{scale:1.05}}
          whileTap={{scale:0.95}}
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{default:{duration:0.5} ,opacity:{delay:0.8, duration:1}}}
          className="inline-flex items-center gap-2 px-12 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white m-auto hover:scale-105 transition-all duration-500">
            Generate Images
            <img src={assets.star_group} alt="" className="h-6" />
          </motion.button>

          {/* <input
            type="text"
            placeholder="Search papers..."
            className="px-6 py-3 bg-white text-black rounded-md w-full md:w-64"
          /> */}
        </div>

        {/* Large robot icon with floating animation */}
        <motion.div
          className="absolute right-10 bottom-0 opacity-70"
          animate={{
            y: [0, -10, 0, 10, 0],
            x: [0, 5, 0, -5, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <Robot className="h-32 w-32 text-purple-500" />
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Header;
