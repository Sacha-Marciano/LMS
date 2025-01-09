// Upload and delete medias to cloudinary account and return the media URL

const express = require("express");
const multer = require("multer");
const { uploadMedia, deleteMedia } = require("../../helpers/cloudinary");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMedia(req.file.path);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error uploading file" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "ID is needed" });
    }
    await deleteMedia(String(id));
    res
      .status(200)
      .json({ success: true, message: "Item deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error deleting file" });
  }
});

module.exports = router;
