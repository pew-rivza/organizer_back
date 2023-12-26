import {Router} from "express";
import db from "../../models";
import bodyParser from "body-parser";
import {MT_MedicationModel} from "../../types/models/medicationTaking";

const router = Router();
const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
  try {
    const medications: MT_MedicationModel[] = await db.MT_Medication.findAll();
    return res.status(200).json(medications);
  } catch (e) {
    console.log("[GET] error in medication:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});


router.post("/", jsonParser, async (req, res) => {
  try {
    const {medications, courseId}: {medications: MT_MedicationModel[], courseId: number} = req.body;
    const addedMedications: MT_MedicationModel[] = [];
    for (const medication of medications) {
      const addedMedication: MT_MedicationModel = await db.MT_Medication.create({
        ...medication,
        MTCourseId: courseId
      });
      addedMedications.push(addedMedication);
    }
    return res.status(200).json(addedMedications);
  } catch (e) {
    console.log("[POST] error in medication:", (e as Error).message);
    return res.status(500).json({message: "server error"});
  }
});

router.put("/", jsonParser, async (req, res) => {
  try {
    const {medications, courseId}: {medications: MT_MedicationModel[], courseId: number} = req.body;

    const allMedicationsIds: number[] = (await db.MT_Medication
      .findAll({where: {MTCourseId: courseId}}))
      .map(medication => medication.id as number);
    const editedMedicationsIds: number[] = medications.map(medication => medication.id as number);
    const deletedMedicationsIds: number[] = allMedicationsIds.filter(id => !editedMedicationsIds.includes(id));

    for (const id of deletedMedicationsIds) {
      await db.CR_Medication.destroy({where: {medicationId: id}})
      await db.MT_Medication.destroy({where: { id, MTCourseId: courseId }});
    }

    for (const medication of medications) {
      if (medication.id) {
        await db.MT_Medication.update({
          ...medication,
        }, {where: { id: medication.id, MTCourseId: courseId }});
      } else {
        await db.MT_Medication.create({
          ...medication,
          MTCourseId: courseId
        });
      }
    }
    return res.status(200).json({});
  } catch (e) {
    console.log("[PUT] error in medication:", (e as Error).message);
    return res.status(500).json({message: "server error"});
  }
});

module.exports = router;
