import {Router} from "express";
import db from "../../models";
import {CR_LookModel} from "../../types/models/calendar";
const router = Router();
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
  try {
    const looks: CR_LookModel[] = await db.CR_Look.findAll();
    return res.status(200).json(looks);
  } catch (e) {
    console.log("[GET] error in calendar look:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});


router.post("/", jsonParser, async (req, res) => {
  try {
    const {date, lookId}: {date: Date, lookId: number} = req.body;
    const addedLook: CR_LookModel = await db.CR_Look.create({date, VWLookId: +lookId});
    return res.status(200).json(addedLook);
  } catch (e) {
    console.log("[POST] error in calendar look:", (e as Error).message);
    return res.status(500).json({message: "server error"});
  }
});

router.delete("/", jsonParser, async (req, res) => {
  try {
    const {date}: {date: Date} = req.body;
    await db.CR_Look.destroy({ where: { date } });
    return res.status(200).json({});
  } catch (e) {
    console.log("[DELETE] error in calendar look:", (e as Error).message);
    return res.status(500).json({message: "server error"});
  }
});

module.exports = router;
