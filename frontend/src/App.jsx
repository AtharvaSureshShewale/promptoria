import React, { useContext } from "react";
import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "./context/AppContext";
// import History from "./pages/History";

const App = () => {
  const { showLogin } = useContext(AppContext);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Inline twinkle animation style */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>

      {/* Twinkling Stars Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white twinkle"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Layout */}
      <div className="relative z-10 px-4 sm:px-10 md:px-14 lg:px-28">
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          closeOnClick
          draggable
          pauseOnHover
          autoClose={4000}
          toastClassName="!p-0 !bg-transparent shadow-none"
          containerStyle={{ marginBottom: "1rem" }} // Add 16px margin bottom here
        />

        <Navbar />
        {showLogin && <Login />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/buy" element={<BuyCredit />} />
          {/* <Route path="/history" element={<History />} /> */}
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
