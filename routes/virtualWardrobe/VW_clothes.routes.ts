import {Router} from "express";
import db from "../../models";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import multer from "multer";
import shortid from "shortid";
import {VW_CategoryModel, VW_ClothesModel} from "../../types/models/virtualWardrobe";

const router = Router();
const jsonParser = bodyParser.json();

const storage: multer.StorageEngine = multer.diskStorage({
  destination: 'uploads/clothes',
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + path.extname(file.originalname))
  }
})

const upload: multer.Multer = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const clothes: VW_ClothesModel[] = await db.VW_Clothes.findAll({
      order: [
        [ "createdAt", "DESC" ],
      ]
    });
    return res.status(200).json(clothes);
  } catch (e) {
    console.log("[GET] error in clothes:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});


router.post("/", upload.single('image'), async (req, res) => {
  try {
    const { categoryId }: {categoryId: number} = req.body;
    if (!req.file?.path) {
      throw new Error("File not found");
    }
    const image: string = "\\" + req.file.path;
    const clothes: VW_ClothesModel = await db.VW_Clothes.create({ image });
    const category: VW_CategoryModel | null = await db.VW_Category.findByPk(categoryId);
    clothes.setVW_Category?.(category);
    return res.status(200).json(clothes);
  } catch (e) {
    console.log("[POST] error in clothes:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

router.put("/", upload.single('image'), async (req, res) => {
  try {
    const { categoryId, clothesId }: { categoryId: number, clothesId: number } = req.body;
    const image: string | null = req.file?.path ? ("\\" + req.file.path) : null;
    const clothes: VW_ClothesModel | null = await db.VW_Clothes.findByPk(clothesId);

    if (image) {
      if (clothes) {
        fs.unlinkSync(clothes.image.slice(1));
      }
      await db.VW_Clothes.update({ image }, { where: { id: clothesId } });
    }

    const category: VW_CategoryModel | null = await db.VW_Category.findByPk(categoryId);
    clothes?.setVW_Category?.(category);
    return res.status(200).json({});
  } catch (e) {
    console.log("[PUT] error in clothes:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

router.delete("/", jsonParser, async (req, res) => {
  try {
    const { clothesId }: {clothesId: number} = req.body;
    const clothes: VW_ClothesModel | null = await db.VW_Clothes.findByPk(+clothesId);

    if (clothes) {
      fs.unlinkSync(clothes.image.slice(1));
    }
    await db.VW_Clothes.destroy({ where: { id: +clothesId } });

    return res.status(200).json({});
  } catch (e) {
    console.log("[DELETE] error in clothes:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
