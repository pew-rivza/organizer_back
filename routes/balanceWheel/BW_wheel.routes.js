const { Router } = require("express");
const bodyParser = require("body-parser");
const db = require("./../../models");
const router = Router();
const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
  try {
    const wheels = await db.BW_Wheel.findAll({
      order: [
        ["date", "ASC"],
      ]
    });
    return res.status(200).json(wheels);
  } catch (e) {
    console.log("[GET] error in wheel:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});

router.post("/", jsonParser, async (req, res) => {
  try {
    const { date } = req.body;
    const wheel = await db.BW_Wheel.create({ date });
    return res.status(200).json(wheel);
  } catch (e) {
    console.log("[POST] error in wheel:", e.message);
    return res.status(500).json({ message: "server error" });
  }
})

router.put("/", jsonParser, async (req, res) => {
  try {
    const { date, wheelId } = req.body;
    await db.BW_Wheel.update({ date }, { where: { id: wheelId } });
    return res.status(200).json({});
  } catch (e) {
    console.log("[PUT] error in wheel:", e.message);
    return res.status(500).json({ message: "server error" });
  }
})

router.delete("/", jsonParser, async (req, res) => {
  try {
    const { wheelId } = req.body;
    await db.BW_Wheel.destroy({ where: { id: wheelId } });
    return res.status(200).json({});
  } catch (e) {
    console.log("[DELETE] error in wheel:", e.message);
    return res.status(500).json({ message: "server error" });
  }
})

module.exports = router;
