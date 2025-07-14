const express = require("express");
const sach = require("../controllers/sach.controller");
const upload = require("../config/cloudinaryStorage");

const router = express.Router();

router.post("/", upload.single("image"), sach.create);

router.put("/:id", upload.single("image"), sach.update);

router.route("/").get(sach.findAll).delete(sach.deleteAll); // POST đã xử lý riêng ở trên

router.route("/:id").get(sach.findOne).delete(sach.delete);

module.exports = router;
