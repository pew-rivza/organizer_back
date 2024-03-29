import {Router} from "express";
import db from "../../models";
import bodyParser from "body-parser";
import {BW_TodoModel} from "../../types/models/balanceWheel";

const jsonParser = bodyParser.json();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const todos: BW_TodoModel[] = await db.BW_Todo.findAll();
    return res.status(200).json(todos);
  } catch (e) {
    console.log("[GET] error in todo:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

router.get("/:wheelid", async (req, res) => {
  try {
    const todos: BW_TodoModel[] = await db.BW_Todo.findAll({
      where: {
        BWWheelId: +req.params.wheelid
      },
      order: [
        [ "checked", "DESC" ],
        [ "createdAt", "ASC" ]
      ]
    });
    return res.status(200).json(todos);
  } catch (e) {
    console.log("[GET] error in todo:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

router.put("/", jsonParser, async (req, res) => {
  try {
    const { todoId, data }: { todoId: number, data: BW_TodoModel } = req.body;
    await db.BW_Todo.update(data, { where: { id: todoId } });
    return res.status(200).json({});
  } catch (e) {
    console.log("[PUT] error in todo:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

router.post("/", jsonParser, async (req, res) => {
  try {
    const { value, areaId, wheelId }: {value: string, areaId: number, wheelId: number} = req.body;
    const todo = await db.BW_Todo.create({ name: value, BWWheelId: wheelId, BWAreaId: areaId });
    return res.status(200).json(todo);
  } catch (e) {
    console.log("[POST] error in todo:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
})

router.delete("/", jsonParser, async (req, res) => {
  try {
    const { todoId }: { todoId: number} = req.body;
    await db.BW_Todo.destroy({ where: { id: todoId } });
    return res.status(200).json({});
  } catch (e) {
    console.log("[DELETE] error in todo:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
})

module.exports = router;
