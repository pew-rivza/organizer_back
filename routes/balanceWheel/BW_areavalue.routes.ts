import { Router } from "express";
import db from "../../models";
import bodyParser from "body-parser";
import {BW_AreaValueModel} from "../../types/models/balanceWheel";
import {EditedAreaValues} from "../../types/routers";

const router = Router();
const jsonParser = bodyParser.json();

router.get("/:wheelid", async (req, res) => {
  try {
    const areaValues: BW_AreaValueModel[] = await db.BW_AreaValue.findAll({
      where: {
        BWWheelId: +req.params.wheelid
      }
    });
    return res.status(200).json(areaValues);
  } catch (e) {
    console.log("[GET] error in areavalue:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

router.put("/", jsonParser, async (req, res) => {
  try {
    const { editedAreaValues }: {editedAreaValues: EditedAreaValues} = req.body;
    const wheelId: number = req.body.wheelId;

    for (const areaValue of Object.values(editedAreaValues)) {
      const where: { BWAreaId: number, BWWheelId: number } = { BWAreaId: areaValue.areaId, BWWheelId: wheelId };
      const foundAreaValue: BW_AreaValueModel | null = await db.BW_AreaValue.findOne({ where });

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
    console.log("[PUT] error in areavalue:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
})

module.exports = router;
