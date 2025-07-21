const express = require("express");
const docgia = require("../controllers/docgia.controller");

const router = express.Router();

// Doi mat khau
router.put("/:id/password", docgia.changePassword);

// Các route hiện tại
router
  .route("/")
  .get(docgia.findAll)
  .post(docgia.create)
  .delete(docgia.deleteAll);

router
  .route("/:id")
  .get(docgia.findOne)
  .put(docgia.update)
  .delete(docgia.delete);

// Thêm route cho đăng nhập và đăng xuất
router.post("/login", docgia.login); // Route để đăng nhập
router.post("/logout", docgia.logout); // Route để đăng xuất

module.exports = router;
