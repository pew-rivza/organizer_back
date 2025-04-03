const { Router } = require("express");
const db = require("./../../models");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const categories = await db.VW_Category.findAll();
    return res.status(200).json(categories);
  } catch (e) {
    console.log("[GET] error in category:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
