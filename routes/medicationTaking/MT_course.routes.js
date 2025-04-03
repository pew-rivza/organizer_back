const { Router } = require("express");
const db = require("./../../models");
const router = Router();
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
  try {
    const courses = await db.MT_Course.findAll({
      order: [
        [ "start", "DESC" ],
      ]
    });
    return res.status(200).json(courses);
  } catch (e) {
    console.log("[GET] error in course:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});


router.post("/", jsonParser, async (req, res) => {
  try {
    const { start, doctor, diagnosis } = req.body;
    const course = await db.MT_Course.create({ start, doctor, diagnosis });
    return res.status(200).json(course);
  } catch (e) {
    console.log("[POST] error in course:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});

router.put("/", jsonParser, async (req, res) => {
  try {
    const { id, start, doctor, diagnosis } = req.body;
    const course = await db.MT_Course.update({ start, doctor, diagnosis }, { where: { id } });
    return res.status(200).json(course);
  } catch (e) {
    console.log("[PUT] error in course:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});

router.delete("/", jsonParser, async (req, res) => {
  try {
    const { courseId } = req.body;
    const medications = await db.MT_Medication.findAll({ where: { MTCourseId: courseId } });
    const medicationsIds = medications.map(medication => medication.id)
    await db.CR_Medication.destroy({where: {medicationId: medicationsIds}})
    await db.MT_Medication.destroy({ where: { MTCourseId: courseId } });
    await db.MT_Course.destroy({ where: { id: courseId } });
    return res.status(200).json({});
  } catch (e) {
    console.log("[DELETE] error in course:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});


module.exports = router;
