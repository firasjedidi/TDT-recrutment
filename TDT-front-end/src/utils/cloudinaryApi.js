import axios from "axios";
import FormData from "form-data";
export const imageUrl = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUD_UPLOAD);
      // Use the correct URL parameter based on your needs
      const urlParameter = import.meta.env.VITE_CLOUD_NAME ? `/${import.meta.env.VITE_CLOUD_NAME}` : '';
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1${urlParameter}/image/upload`, formData);
      return data.url;
    } catch (error) {
      return "error";
    }
  };