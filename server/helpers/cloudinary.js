const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMedia = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return result;
  } catch (err) {
    console.log(err);
    throw new Error("Error uploading to Cloudinary");
  }
};

const deleteMedia = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (err) {
    console.log(err);
    throw new Error("Error deleting assest from Cloudinary");
  }
};

module.exports = { uploadMedia, deleteMedia };
