const { Router } = require("express");
const db = require("./../../models");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const options = await db.MT_Option.findAll();
    return res.status(200).json(options);
  } catch (e) {
    console.log("[GET] error in option:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
