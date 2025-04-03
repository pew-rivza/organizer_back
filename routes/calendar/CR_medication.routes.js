const {Router} = require("express");
const db = require("./../../models");
const router = Router();
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
  try {
    const medications = await db.CR_Medication.findAll();
    return res.status(200).json(medications);
  } catch (e) {
    console.log("[GET] error in calendar medication:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});


router.post("/", jsonParser, async (req, res) => {
  try {
    const {date, timesOfDay, medicationId} = req.body;
    const addedMedication = await db.CR_Medication.create({date, timesOfDay, medicationId});
    return res.status(200).json(addedMedication);
  } catch (e) {
    console.log("[POST] error in calendar medication:", e.message);
    return res.status(500).json({message: "server error"});
  }
});

router.delete("/", jsonParser, async (req, res) => {
  try {
    const {id} = req.body;
    await db.CR_Medication.destroy({ where: { id } });
    return res.status(200).json({});
  } catch (e) {
    console.log("[DELETE] error in calendar medication:", e.message);
    return res.status(500).json({message: "server error"});
  }
});

module.exports = router;
