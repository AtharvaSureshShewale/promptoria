import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";
export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userId; // Get from middleware

    const user = await userModel.findById(userId);

    if (!user || !prompt || prompt.trim() === "") {
      return res.json({
        success: false,
        message: "Missing details",
      });
    }

    if (user.creditBalance===0 || user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.API_KEY,
           // Don't forget this for FormData
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data).toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
