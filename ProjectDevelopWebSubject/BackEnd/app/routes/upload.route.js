const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/image", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader
      .upload_stream({ resource_type: "image" }, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ url: result.secure_url });
      })
      .end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
