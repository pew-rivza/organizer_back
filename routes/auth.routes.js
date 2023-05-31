const { Router } = require("express");
const router = Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const sha256 = require('js-sha256').sha256;
const config = require("config");

router.post("/", jsonParser, async (req, res) => {
  try {
    const { password } = req.body;
    console.log("ya popav", password);
    const seed = config.get("seed");
    const configPassword = config.get("password");
    const isAllowed = sha256(seed) + sha256(password) === configPassword;
    console.log("isAllowed", isAllowed);
    return res.status(200).json({authenticated: isAllowed});
  } catch (e) {
    console.log("[POST] error in wheel:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;