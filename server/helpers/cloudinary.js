// Cloudinary API calls
// To change account change parameters in .env file NOT HERE

const cloudinary = require("cloudinary").v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Received server uploaded media and uploads it to cloudinary
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

// Receive media public_id and destroys it on cloudinary account
const deleteMedia = async (public_id) => {
  try {
    /////// BUG ///////// response is successfull but item is not deleted from cloudinary account ////
    await cloudinary.uploader.destroy(public_id);
  } catch (err) {
    console.log(err);
    throw new Error("Error deleting assest from Cloudinary");
  }
};

module.exports = { uploadMedia, deleteMedia };
