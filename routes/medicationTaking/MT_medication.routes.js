const {Router} = require("express");
const db = require("./../../models");
const router = Router();
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
  try {
    const medications = await db.MT_Medication.findAll();
    return res.status(200).json(medications);
  } catch (e) {
    console.log("[GET] error in medication:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});


router.post("/", jsonParser, async (req, res) => {
  try {
    const {medications, courseId} = req.body;
    const addedMedications = [];
    for (const medication of medications) {
      const addedMedication = await db.MT_Medication.create({
        ...medication,
        MTCourseId: courseId
      });
      addedMedications.push(addedMedication)
    }
    return res.status(200).json(addedMedications);
  } catch (e) {
    console.log("[POST] error in medication:", e.message);
    return res.status(500).json({message: "server error"});
  }
});

router.put("/", jsonParser, async (req, res) => {
  try {
    const {medications, courseId} = req.body;

    const allMedicationsIds = (await db.MT_Medication
      .findAll({where: {MTCourseId: courseId}}))
      .map(medication => medication.id);
    const editedMedicationsIds = medications.map(medication => medication.id);
    const deletedMedicationsIds = allMedicationsIds.filter(id => !editedMedicationsIds.includes(id))

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
    console.log("[PUT] error in medication:", e.message);
    return res.status(500).json({message: "server error"});
  }
});

module.exports = router;
