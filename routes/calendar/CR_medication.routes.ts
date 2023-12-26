import {Router} from "express";
import db from "../../models";
import bodyParser from "body-parser";
import {CR_MedicationModel} from "../../types/models/calendar";

const router = Router();
const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
  try {
    const medications: CR_MedicationModel[] = await db.CR_Medication.findAll();
    return res.status(200).json(medications);
  } catch (e) {
    console.log("[GET] error in calendar medication:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});


router.post("/", jsonParser, async (req, res) => {
  try {
    const {date, timesOfDay, medicationId}: {date: Date, timesOfDay: string, medicationId: number} = req.body;
    const addedMedication: CR_MedicationModel = await db.CR_Medication.create({date, timesOfDay, medicationId});
    return res.status(200).json(addedMedication);
  } catch (e) {
    console.log("[POST] error in calendar medication:", (e as Error).message);
    return res.status(500).json({message: "server error"});
  }
});

router.delete("/", jsonParser, async (req, res) => {
  try {
    const {id}: {id: number} = req.body;
    await db.CR_Medication.destroy({ where: { id } });
    return res.status(200).json({});
  } catch (e) {
    console.log("[DELETE] error in calendar medication:", (e as Error).message);
    return res.status(500).json({message: "server error"});
  }
});

module.exports = router;
