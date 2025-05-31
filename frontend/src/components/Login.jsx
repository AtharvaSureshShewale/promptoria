import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { RobotToast } from "./RobotToast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false); // Hide modal after login success
          toast.success(<RobotToast message="Login successful!" />);
          navigate('/');
        } else {
          toast.error(<RobotToast message={data.message || "Login failed"} />);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false); // Hide modal after signup success
          toast.success(<RobotToast message="Signup successful!" />);
          navigate('/');
        } else {
          toast.error(<RobotToast message={data.message || "Signup failed"} />);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(
        <RobotToast
          message={
            error.response?.data?.message || error.message || "Something went wrong"
          }
        />
      );
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-start pt-40">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-black border border-purple-500 p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-purple-500 font-medium">{state}</h1>
        <p className="text-sm text-white text-center">
          {state === "Login"
            ? "Welcome back! Please sign in to continue"
            : "Welcome!!! Please sign up to continue"}
        </p>

        {state !== "Login" && (
          <div className="border border-purple-500 px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img
              src={assets.profile_icon}
              alt=""
              className="w-6 h-6 filter invert"
            />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              required
              className="outline-none text-sm leading-none py-1 bg-transparent text-white"
            />
          </div>
        )}

        <div className="border border-purple-500 px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" className="w-4 h-4" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
            className="outline-none text-sm leading-none px-[6px] py-1 bg-transparent text-white"
          />
        </div>

        <div className="border border-purple-500 px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" className="w-4 h-4" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
            className="outline-none text-sm leading-none px-[6px] py-1 bg-transparent text-white"
          />
        </div>

        <p className="text-sm text-purple-400 my-4 cursor-pointer">Forgot Password</p>

        <button className="bg-purple-600 w-full text-white py-2 rounded-full">
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center text-white">
            Don't have an account?&nbsp;
            <span
              className="text-purple-500 cursor-pointer"
              onClick={() => setState("SignUp")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center text-white">
            Already have an account?&nbsp;
            <span
              className="text-purple-500 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          src={assets.cross_icon}
          onClick={() => setShowLogin(false)}
          className="absolute top-5 right-5 cursor-pointer filter-purple"
          alt="Close"
        />
      </motion.form>
    </div>
  );
};

export default Login;
