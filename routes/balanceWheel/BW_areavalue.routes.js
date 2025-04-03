const { Router } = require("express");
const bodyParser = require("body-parser");
const db = require("./../../models");
const router = Router();
const jsonParser = bodyParser.json();

router.get("/:wheelid", async (req, res) => {
  try {
    const areaValues = await db.BW_AreaValue.findAll({
      where: {
        BWWheelId: req.params.wheelid
      }
    });
    return res.status(200).json(areaValues);
  } catch (e) {
    console.log("[GET] error in areavalue:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});

router.put("/", jsonParser, async (req, res) => {
  try {
    const { editedAreaValues, wheelId } = req.body;

    for (const areaValue of Object.values(editedAreaValues)) {
      const where = { BWAreaId: areaValue.areaId, BWWheelId: wheelId };
      const foundAreaValue = await db.BW_AreaValue.findOne({ where });

      if (foundAreaValue) {
        await db.BW_AreaValue.update({ value: areaValue.value }, { where })
      } else {
        await db.BW_AreaValue.create({
          BWAreaId: areaValue.areaId,
          BWWheelId: wheelId,
          value: areaValue.value,
        })
      }
    }
    return res.status(200).json({});
  } catch (e) {
    console.log("[PUT] error in areavalue:", e.message);
    return res.status(500).json({ message: "server error" });
  }
})

module.exports = router;
