import {Router} from "express";
import db from "../../models";
import bodyParser from "body-parser";
import {MT_CourseModel, MT_MedicationModel} from "../../types/models/medicationTaking";

const router = Router();
const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
  try {
    const courses: MT_CourseModel[] = await db.MT_Course.findAll({
      order: [
        [ "start", "DESC" ],
      ]
    });
    return res.status(200).json(courses);
  } catch (e) {
    console.log("[GET] error in course:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});


router.post("/", jsonParser, async (req, res) => {
  try {
    const { start, doctor, diagnosis }: MT_CourseModel = req.body;
    const course: MT_CourseModel = await db.MT_Course.create({ start, doctor, diagnosis });
    return res.status(200).json(course);
  } catch (e) {
    console.log("[POST] error in course:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

router.put("/", jsonParser, async (req, res) => {
  try {
    const { id, start, doctor, diagnosis }: MT_CourseModel = req.body;
    const course: [affectedCount: number] = await db.MT_Course.update({ start, doctor, diagnosis }, { where: { id } });
    return res.status(200).json(course);
  } catch (e) {
    console.log("[PUT] error in course:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

router.delete("/", jsonParser, async (req, res) => {
  try {
    const { courseId }: {courseId: number} = req.body;
    const medications: MT_MedicationModel[] = await db.MT_Medication.findAll({ where: { MTCourseId: courseId } });
    const medicationsIds: number[] = medications.map((medication: MT_MedicationModel) => medication.id as number);

    await db.CR_Medication.destroy({where: {medicationId: medicationsIds}});
    await db.MT_Medication.destroy({ where: { MTCourseId: courseId } });
    await db.MT_Course.destroy({ where: { id: courseId } });
    return res.status(200).json({});
  } catch (e) {
    console.log("[DELETE] error in course:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});


module.exports = router;
