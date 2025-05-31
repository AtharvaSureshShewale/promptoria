// src/pages/Result.jsx
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { RobotToast } from "../components/RobotToast";
import { useNavigate } from "react-router-dom";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const { generateImage, credit } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!SpeechRecognition) {
      toast.error(<RobotToast message="Speech Recognition not supported in this browser" />);
      return;
    }

    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.lang = "en-US";
    recog.interimResults = false;

    recog.onstart = () => setIsListening(true);
    recog.onend = () => setIsListening(false);
    recog.onerror = (e) => {
      setIsListening(false);
      toast.error(<RobotToast message={`Voice Error: ${e.error}`} />);
    };
    recog.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    setRecognition(recog);
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (credit === 0) {
      toast.error(<RobotToast message="No Credits Balance" />);
      navigate("/buy");
      return;
    }

    if (!input.trim()) {
      toast.error(<RobotToast message="Prompt cannot be empty" />);
      return;
    }

    setLoading(true);

    const result = await generateImage(input);

    if (result?.noCredit) {
      toast.error(<RobotToast message="No Credits Balance" />);
      navigate("/buy");
    } else if (result) {
      setImage(result);
      setIsImageLoaded(true);
    }

    setLoading(false);
  };

  return (
    <motion.form
      id="prompt-form"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div>
        {image && (
          <div className="relative">
            <img src={image} alt="Generated" className="max-w-sm rounded" />
            <span
              className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 ${
                loading ? "w-full transition-all duration-[10s]" : "w-0"
              }`}
            />
          </div>
        )}
        <p className={`text-white ${loading ? "" : "hidden"}`}>Loading...</p>
      </div>

      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-zinc-700 text-white text-sm p-0.5 mt-10 rounded-full items-center">
          <input
            type="text"
            placeholder="Enter prompt or use voice..."
            className="flex-1 bg-transparent outline-none ml-3 sm:ml-4 md:ml-6 placeholder:text-zinc-400 focus:ring-0"

            onChange={(e) => setInput(e.target.value)}
            value={input}
          />

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={() => recognition && recognition.start()}
            className={`text-white p-3 transition hover:scale-110 ${
              isListening ? "animate-pulse text-pink-400" : ""
            }`}
            title="Speak Prompt"
          >
            🎤
          </button>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 sm:px-16 py-3 rounded-full hover:brightness-110 transition duration-200 flex items-center justify-center"

          >
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              setIsImageLoaded(false);
            }}
            className="bg-transparent border border-white text-white px-8 py-3 rounded-full cursor-pointer hover:bg-zinc-900 transition duration-200"
          >
            Generate Another
          </p>
          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer hover:bg-zinc-800 transition duration-200"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
