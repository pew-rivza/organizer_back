const { Router } = require("express");
const bodyParser = require("body-parser");
const db = require("./../../models");
const router = Router();
const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
    try {
        const checkLists = await db.CL_CheckList.findAll({
            order: [
                ["createdAt", "DESC"],
            ]
        });
        return res.status(200).json(checkLists);
    } catch (e) {
        console.log("[GET] error in checklist:", e.message);
        return res.status(500).json({ message: "server error" });
    }
});

router.post("/", jsonParser, async (req, res) => {
    try {
        const { name } = req.body.data;
        const checkList = await db.CL_CheckList.create({ name });
        return res.status(200).json(checkList);
    } catch (e) {
        console.log("[POST] error in checklist:", e.message);
        return res.status(500).json({ message: "server error" });
    }
})

router.put("/", jsonParser, async (req, res) => {
    try {
        const { name, id } = req.body.data;
        await db.CL_CheckList.update({ name }, { where: { id } });
        return res.status(200).json({});
    } catch (e) {
        console.log("[PUT] error in checklist:", e.message);
        return res.status(500).json({ message: "server error" });
    }
})

router.delete("/", jsonParser, async (req, res) => {
    try {
        const { checkListId } = req.body;
        await db.CL_CheckList.destroy({ where: { id: checkListId } });
        return res.status(200).json({});
    } catch (e) {
        console.log("[DELETE] error in checklist:", e.message);
        return res.status(500).json({ message: "server error" });
    }
})

module.exports = router;
