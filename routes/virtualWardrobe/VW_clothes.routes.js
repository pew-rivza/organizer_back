const { Router } = require("express");
const db = require("./../../models");
const router = Router();
const path = require('path')
const multer = require('multer');
const shortid = require('shortid');
const fs  = require("fs");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

const storage = multer.diskStorage({
  destination: 'uploads/clothes',
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const clothes = await db.VW_Clothes.findAll({
      order: [
        [ "createdAt", "DESC" ],
      ]
    });
    return res.status(200).json(clothes);
  } catch (e) {
    console.log("[GET] error in clothes:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});


router.post("/", upload.single('image'), async (req, res) => {
  try {
    const { categoryId } = req.body;
    const image = "\\" + req.file.path;
    const clothes = await db.VW_Clothes.create({ image });
    const category = await db.VW_Category.findByPk(categoryId);
    clothes.setVW_Category(category);
    return res.status(200).json(clothes);
  } catch (e) {
    console.log("[POST] error in clothes:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});

router.put("/", upload.single('image'), async (req, res) => {
  try {
    const { categoryId, clothesId } = req.body;
    const image = req.file?.path ? ("\\" + req.file.path) : null;
    const clothes = await db.VW_Clothes.findByPk(clothesId);

    if (image) {
      fs.unlinkSync(clothes.image.slice(1));
      await db.VW_Clothes.update({ image }, { where: { id: clothesId } });
    }

    const category = await db.VW_Category.findByPk(categoryId);
    clothes.setVW_Category(category);
    return res.status(200).json({});
  } catch (e) {
    console.log("[PUT] error in clothes:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});

router.delete("/", jsonParser, async (req, res) => {
  try {
    const { clothesId } = req.body;
    const clothes = await db.VW_Clothes.findByPk(clothesId);

    fs.unlinkSync(clothes.image.slice(1));
    await db.VW_Clothes.destroy({ where: { id: clothesId } });

    return res.status(200).json({});
  } catch (e) {
    console.log("[DELETE] error in clothes:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
