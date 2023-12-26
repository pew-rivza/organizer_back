import {Router} from "express";
import db from "../../models";
import {MT_OptionModel} from "../../types/models/medicationTaking";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const options: MT_OptionModel[] = await db.MT_Option.findAll();
    return res.status(200).json(options);
  } catch (e) {
    console.log("[GET] error in option:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
