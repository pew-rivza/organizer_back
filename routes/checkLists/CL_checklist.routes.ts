import {Router} from "express";
import db from "../../models";
import bodyParser from "body-parser";
import {CL_CheckListModel} from "../../types/models/checkLists";

const router = Router();
const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
    try {
        const checkLists: CL_CheckListModel[] = await db.CL_CheckList.findAll({
            order: [
                ["createdAt", "DESC"],
            ]
        });
        return res.status(200).json(checkLists);
    } catch (e) {
        console.log("[GET] error in checklist:", (e as Error).message);
        return res.status(500).json({ message: "server error" });
    }
});

router.post("/", jsonParser, async (req, res) => {
    try {
        const { name }: {name: string} = req.body.data;
        const checkList: CL_CheckListModel = await db.CL_CheckList.create({ name });
        return res.status(200).json(checkList);
    } catch (e) {
        console.log("[POST] error in checklist:", (e as Error).message);
        return res.status(500).json({ message: "server error" });
    }
})

router.put("/", jsonParser, async (req, res) => {
    try {
        const { name, id }: CL_CheckListModel = req.body.data;
        await db.CL_CheckList.update({ name }, { where: { id } });
        return res.status(200).json({});
    } catch (e) {
        console.log("[PUT] error in checklist:", (e as Error).message);
        return res.status(500).json({ message: "server error" });
    }
})

router.delete("/", jsonParser, async (req, res) => {
    try {
        const { checkListId }: {checkListId: number} = req.body;
        await db.CL_CheckList.destroy({ where: { id: checkListId } });
        return res.status(200).json({});
    } catch (e) {
        console.log("[DELETE] error in checklist:", (e as Error).message);
        return res.status(500).json({ message: "server error" });
    }
})

module.exports = router;
