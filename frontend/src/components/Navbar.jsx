import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { MdHistory } from "react-icons/md";  // <-- import history icon

const Navbar = () => {
  const { user, setShowLogin, credit, logout } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-4 px-4 sm:px-8">
      <Link to="/">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-28 sm:w-32 lg:w-40 filter invert"
        />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-white/20 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
            >
              <img
                className="w-5"
                src={assets.credit_star}
                alt="Credits"
                style={{
                  filter:
                    "invert(17%) sepia(91%) saturate(1479%) hue-rotate(247deg) brightness(89%) contrast(89%)",
                }}
              />
              <p className="text-white text-xs sm:text-sm font-medium">
                Credits left: {credit}
              </p>
            </button>

            {/* History Icon Button */}
            {/* <button
              onClick={() => navigate("/history")}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
              title="History"
            >
              <MdHistory className="w-5 h-5 text-white" />
            </button> */}

            <p className="text-white max-sm:hidden pl-2">
              Hi, {user.name || "User"}
            </p>

            <div className="relative group">
              <img
                className="w-10 drop-shadow cursor-pointer"
                src={assets.profile_icon}
                alt="Profile"
              />

              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-white text-center rounded pt-12 ">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm text-black">
                  <li
                    onClick={logout}
                    className="py-1 px-2 cursor-pointer hover:bg-zinc-100"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p
              onClick={() => navigate("/buy")}
              className="cursor-pointer text-white pt-[6px]"
            >
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
