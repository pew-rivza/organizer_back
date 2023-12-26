import {Router} from "express";
import db from "../../models";
import bodyParser from "body-parser";
import {CL_TodoModel} from "../../types/models/checkLists";

const jsonParser = bodyParser.json();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const todos: CL_TodoModel[] = await db.CL_Todo.findAll({
      order: [
        [ "checked", "ASC" ],
        db.sequelize.fn('isnull', db.sequelize.col('date')),
        [ "date", "ASC" ],
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
    const { id, ...data }: CL_TodoModel = req.body.data;
    await db.CL_Todo.update(data, { where: { id } });
    return res.status(200).json({});
  } catch (e) {
    console.log("[PUT] error in todo:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

router.post("/", jsonParser, async (req, res) => {
  try {
    const { date, value, checkListId }: {date: Date, value: string, checkListId: number} = req.body;
    const todo: CL_TodoModel = await db.CL_Todo.create({ date: date, name: value, CLCheckListId: checkListId });
    return res.status(200).json(todo);
  } catch (e) {
    console.log("[POST] error in todo:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
})

router.delete("/", jsonParser, async (req, res) => {
  try {
    const { todoId }: { todoId: number } = req.body;
    await db.CL_Todo.destroy({ where: { id: todoId } });
    return res.status(200).json({});
  } catch (e) {
    console.log("[DELETE] error in todo:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
})

module.exports = router;
