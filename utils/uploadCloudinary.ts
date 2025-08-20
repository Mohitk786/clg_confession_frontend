import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

const uploadCloudinary = async (base64Image:string) => {
  try {
    if (!base64Image) return null;

    const response = await cloudinary.uploader.upload(base64Image, {
      resource_type: "auto",
    });

    return response.secure_url;
  } catch (error) {
    return null;
  }
};

export default uploadCloudinary;