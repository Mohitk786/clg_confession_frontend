import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

exports.uploadCloudinary = async (base64Image) => {
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
