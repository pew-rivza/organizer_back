import {Router} from "express";
import db from "../../models";
import bodyParser from "body-parser";
import fs from "fs";
import shortid from "shortid";
import {VW_Clothes_LookModel, VW_ClothesModel, VW_LookModel} from "../../types/models/virtualWardrobe";
import {ClothesBlob, LookInfo, LookWithBlob} from "../../types/routers";

const router = Router();
const jsonParser = bodyParser.json({limit: '200mb', type:'application/json'});

router.get("/", async (req, res) => {
  try {
    const looks: VW_LookModel[] = await db.VW_Look.findAll({
      order: [
        [ "createdAt", "DESC" ],
      ],
    });

    let looksWithBlob: LookWithBlob[] = [];
    for (const look of looks) {
      const { id, canvasSize, image } = look;
      const lookClothes: VW_Clothes_LookModel[] = await db.VW_Clothes_Look.findAll({
        where: { VWLookId: id },
        order: [["zIndex", "ASC"]]
      });

      const fullClothes: ClothesBlob[] = []
      for (const cloth of lookClothes) {
        const clothes: VW_ClothesModel | null = await db.VW_Clothes.findOne({where: {id: cloth.VWClotheId}});
        if (clothes) {
          const {idOnCanvas, x, y, width, height, offsetX, offsetY, zIndex} = cloth
          const {id, image, VWCategoryId} = clothes.dataValues;
          fullClothes.push({
            idOnCanvas, x, y, width, height,
            offsetX, offsetY, zIndex, id, image,
            VWCategoryId
          } as ClothesBlob);
        }
      }

      const currentImage: string = fs.readFileSync(image, 'utf-8');
      looksWithBlob.push({ id: id as number, canvasSize, image: currentImage, clothes: fullClothes });
    }

    return res.status(200).json(looksWithBlob);
  } catch (e) {
    console.log("[GET] error in look:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

router.post("/", jsonParser, async (req, res) => {
  try {
    const { look }: {look: LookInfo} = req.body;
    const { clothes, canvasSize, image } = look;
    const imageName: string = shortid.generate();

    fs.writeFileSync(
      `uploads/looks/${imageName}.txt`,
      image,
      'utf-8');

    const addedLook: VW_LookModel = await db.VW_Look.create({ canvasSize, image: `uploads/looks/${imageName}.txt` });

    for (const cloth of clothes) {
      const {id, idOnCanvas, x, y, width, height, offsetX, offsetY, zIndex } = cloth;
      await db.VW_Clothes_Look.create(
        { idOnCanvas, x, y, width, height, offsetX, offsetY, zIndex, VWClotheId: id, VWLookId: addedLook.id }
      )
    }

    return res.status(200).json({addedLook});
  } catch (e) {
    console.log("[POST] error in look:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

router.put("/", jsonParser, async (req, res) => {
  try {
    const { look }: {look: LookInfo} = req.body;
    const { clothes, canvasSize, image, id } = look;
    const updatedLook: VW_LookModel | null = await db.VW_Look.findOne({where: { id }});

    const allClothesIds: string[] = (await db.VW_Clothes_Look
      .findAll({where: {VWLookId: id}}))
      .map(cloth => cloth.idOnCanvas);
    const editedClothesIds: string[] = clothes
      .filter(cloth => allClothesIds.includes(cloth.idOnCanvas))
      .map(cloth => cloth.idOnCanvas);
    const deletedClothesIds: string[] = allClothesIds.filter(id => !editedClothesIds.includes(id));
    const editedClothes: VW_Clothes_LookModel[] = clothes.filter(cloth => allClothesIds.includes(cloth.idOnCanvas));
    const addedClothes: VW_Clothes_LookModel[] = clothes.filter(cloth => !allClothesIds.includes(cloth.idOnCanvas));

    updatedLook && fs.writeFileSync(
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
      const {id: editedClothesId, idOnCanvas, x, y, width, height, offsetX, offsetY, zIndex }: VW_Clothes_LookModel = cloth;
      await db.VW_Clothes_Look.update(
        { idOnCanvas, x, y, width, height, offsetX, offsetY, zIndex },
        { where: { VWClotheId: editedClothesId, VWLookId: id, idOnCanvas } }
      )
    }

    for (const cloth of addedClothes) {
      const {id: addedClothesId, idOnCanvas, x, y, width, height, offsetX, offsetY, zIndex }: VW_Clothes_LookModel = cloth;
      await db.VW_Clothes_Look.create(
        { idOnCanvas, x, y, width, height, offsetX, offsetY, zIndex, VWClotheId: addedClothesId, VWLookId: id }
      )
    }

    return res.status(200).json({});
  } catch (e) {
    console.log("[PUT] error in look:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

router.delete("/", jsonParser, async (req, res) => {
  try {
    const { lookId }: {lookId: number} = req.body;
    const look: VW_LookModel | null = await db.VW_Look.findByPk(lookId);

    look && fs.unlinkSync(look.image);
    await db.VW_Look.destroy({ where: { id: lookId } });

    return res.status(200).json({});
  } catch (e) {
    console.log("[DELETE] error in look:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
