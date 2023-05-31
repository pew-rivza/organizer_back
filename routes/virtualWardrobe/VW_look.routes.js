const { Router } = require("express");
const db = require("./../../models");
const router = Router();
const shortid = require('shortid');
const bodyParser = require("body-parser");
const fs  = require("fs");

const jsonParser = bodyParser.json({limit: '200mb', extended: true, type:'application/json'});

router.get("/", async (req, res) => {
  try {
    const looks = await db.VW_Look.findAll({
      order: [
        [ "createdAt", "DESC" ],
      ],
    });

    let looksWithBlob = [];
    for (const look of looks) {
      const { id, canvasSize, image } = look;
      const lookClothes = await db.VW_Clothes_Look.findAll({
        where: { VWLookId: id },
        order: [["zIndex", "ASC"]]
      });

      const fullClothes = []
      for (const cloth of lookClothes) {
        const clothes = await db.VW_Clothes.findOne({where: {id: cloth.VWClotheId}});
        const {idOnCanvas, x, y, width, height, offsetX, offsetY, zIndex} = cloth
        const {id, image, VWCategoryId} = clothes.dataValues;
        fullClothes.push({ idOnCanvas, x, y, width, height, offsetX, offsetY, zIndex, id, image, VWCategoryId });
      }

      const currentImage = fs.readFileSync(image, 'utf-8');
      looksWithBlob.push({ id, canvasSize, image: currentImage, clothes: fullClothes });
    }

    return res.status(200).json(looksWithBlob);
  } catch (e) {
    console.log("[GET] error in look:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});

router.post("/", jsonParser, async (req, res) => {
  try {
    const { look } = req.body;
    const { clothes, canvasSize, image } = look;
    const imageName = shortid.generate();

    fs.writeFileSync(
      `uploads/looks/${imageName}.txt`,
      image,
      'utf-8');

    const addedLook = await db.VW_Look.create({ canvasSize, image: `uploads/looks/${imageName}.txt` });

    for (const cloth of clothes) {
      const {id, idOnCanvas, x, y, width, height, offsetX, offsetY, zIndex } = cloth;
      await db.VW_Clothes_Look.create(
        { idOnCanvas, x, y, width, height, offsetX, offsetY, zIndex, VWClotheId: id, VWLookId: addedLook.id }
      )
    }

    return res.status(200).json({addedLook});
  } catch (e) {
    console.log("[POST] error in look:", e.message, e);
    return res.status(500).json({ message: "server error" });
  }
});

router.put("/", jsonParser, async (req, res) => {
  try {
    const { look } = req.body;
    const { clothes, canvasSize, image, id } = look;
    const updatedLook = await db.VW_Look.findOne({where: { id }});

    const allClothesIds = (await db.VW_Clothes_Look
      .findAll({where: {VWLookId: id}}))
      .map(cloth => cloth.idOnCanvas);
    const editedClothesIds = clothes
      .filter(cloth => allClothesIds.includes(cloth.idOnCanvas))
      .map(cloth => cloth.idOnCanvas);
    const deletedClothesIds = allClothesIds.filter(id => !editedClothesIds.includes(id));
    const editedClothes = clothes.filter(cloth => allClothesIds.includes(cloth.idOnCanvas));
    const addedClothes = clothes.filter(cloth => !allClothesIds.includes(cloth.idOnCanvas));

    fs.writeFileSync(
      updatedLook.image,
      image,
      'utf-8');

    await db.VW_Look.update(
      { canvasSize },
      { where: { id } }
    );

    for (const id of deletedClothesIds) {
      await db.VW_Clothes_Look.destroy({where: {idOnCanvas: id}})
    }

    for (const cloth of editedClothes) {
      const {id: editedClothesId, idOnCanvas, x, y, width, height, offsetX, offsetY, zIndex } = cloth;
      await db.VW_Clothes_Look.update(
        { idOnCanvas, x, y, width, height, offsetX, offsetY, zIndex },
        { where: { VWClotheId: editedClothesId, VWLookId: id, idOnCanvas } }
      )
    }

    for (const cloth of addedClothes) {
      const {id: addedClothesId, idOnCanvas, x, y, width, height, offsetX, offsetY, zIndex } = cloth;
      await db.VW_Clothes_Look.create(
        { idOnCanvas, x, y, width, height, offsetX, offsetY, zIndex, VWClotheId: addedClothesId, VWLookId: id }
      )
    }

    return res.status(200).json({});
  } catch (e) {
    console.log("[PUT] error in look:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});

router.delete("/", jsonParser, async (req, res) => {
  try {
    const { lookId } = req.body;
    const look = await db.VW_Look.findByPk(lookId);

    fs.unlinkSync(look.image);
    await db.VW_Look.destroy({ where: { id: lookId } });

    return res.status(200).json({});
  } catch (e) {
    console.log("[DELETE] error in look:", e.message);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
