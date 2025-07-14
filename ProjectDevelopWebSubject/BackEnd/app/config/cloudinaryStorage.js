const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary"); // dùng file config bạn tạo

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sach", // thư mục trong Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

const upload = multer({ storage });

module.exports = upload;
