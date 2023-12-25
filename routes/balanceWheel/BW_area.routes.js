const { Router } = require("express");
const db = require("./../../models");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const areas = await db.BW_Area.findAll();
    return res.status(200).json(areas);
  } catch (e) {
    console.log("[GET] error in area:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
