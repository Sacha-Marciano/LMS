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

router.post("/bulk-upload", upload.array("files", 10), async (req, res) => {
  try {
    const uploadPromises = req.files.map((file) => uploadMedia(file.path));

    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      message: "Files bulk  uploaded successfully",
      data: results,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error uploading bulk files" });
  }
});

module.exports = router;
