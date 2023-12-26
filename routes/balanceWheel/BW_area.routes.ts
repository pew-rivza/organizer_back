import { Router } from "express";
import db from "../../models";
import {BW_AreaModel} from "../../types/models/balanceWheel";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const areas: BW_AreaModel[] = await db.BW_Area.findAll();
    return res.status(200).json(areas);
  } catch (e) {
    console.log("[GET] error in area:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
