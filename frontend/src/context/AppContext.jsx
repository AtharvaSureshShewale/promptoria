import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { RobotToast } from "../components/RobotToast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate=useNavigate();
  const loadUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/credits', {
        headers: { token },
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.error("Failed to load user:", error);
      toast.error(<RobotToast message={error.message || "Error loading user"} />);
    }
  };

  const generateImage = async (prompt) => {
  try {
    const { data } = await axios.post(
      backendUrl + "/api/image/generate-image",
      { prompt },
      { headers: { token } }
    );

    if (data.success) {
      loadUserData();
      return data.resultImage;
    } else {
      loadUserData();
      if (data.creditBalance === 0) {
        return { noCredit: true };
      } else {
        toast.error(<RobotToast message={data.message || "Prompt Error"} />);
        return null;
      }
    }
  } catch (error) {
    console.error("Failed to generate image:", error);
    toast.error(<RobotToast message={error.message || "Error occurred"} />);
    return null;
  }
};


  const logout=()=>{
    localStorage.removeItem('token');
    setUser(null);
    setToken('');
    navigate('/');
  }

  useEffect(() => {
    if (token) {
      loadUserData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadUserData,
    logout,
    generateImage
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
