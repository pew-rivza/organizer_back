import {Router} from "express";
import db from "../../models";
import {VW_CategoryModel} from "../../types/models/virtualWardrobe";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const categories: VW_CategoryModel[] = await db.VW_Category.findAll();
    return res.status(200).json(categories);
  } catch (e) {
    console.log("[GET] error in category:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
