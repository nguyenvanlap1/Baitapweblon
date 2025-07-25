const auth = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.route("/login").post(auth.login);

router.route("/logout").post(auth.logout);

router.route("/checklogin").post(auth.checkLogin);

router.route("/profile").get(auth.getProfile);

module.exports = router;
