import axios from "axios";
import FormData from "form-data";

export const removeBackground = async (req, res) => {
  try {
    const { imageBase64, userId } = req.body;

    if (!imageBase64 || !userId) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const formData = new FormData();
    formData.append("image_file_b64", imageBase64);
    formData.append("size", "auto");

    const response = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "X-Api-Key": import.meta.env.VITE_REMOVE_BG_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    // Convert to base64 PNG
    const resultBase64 = Buffer.from(response.data).toString("base64");

    res.json({
      image: `data:image/png;base64,${resultBase64}`,
    });
  } catch (error) {
    res.status(500).json({
      error: "Background removal failed",
    });
  }
};
