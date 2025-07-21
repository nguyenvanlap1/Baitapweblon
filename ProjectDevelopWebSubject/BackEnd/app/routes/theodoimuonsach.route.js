const express = require("express");
const theodoimuonsach = require("../controllers/theodoimuonsach.controller");
const protectedController = require("../controllers/protect.controller");

const router = express.Router();

router
  .route("/")
  .get(protectedController.isAdmin, theodoimuonsach.findAll)
  .post(theodoimuonsach.create)
  .delete(theodoimuonsach.deleteAll);

router.route("/docgia").post(theodoimuonsach.findByDocGia);

router
  .route("/:id")
  .get(theodoimuonsach.findOne)
  .put(theodoimuonsach.update)
  .delete(theodoimuonsach.delete);

module.exports = router;
