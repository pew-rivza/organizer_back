import {Router} from "express";
import bodyParser from "body-parser";
import config from "config";
import {sha256} from "js-sha256";
import {Error} from "sequelize";

const router = Router();
const jsonParser = bodyParser.json();

router.post("/", jsonParser, async (req, res) => {
  try {
    const { password }: {password: string} = req.body;
    const seed: string = config.get("seed");
    const configPassword: string = config.get("password");
    const isAllowed: boolean = sha256(seed) + sha256(password) === configPassword;
    return res.status(200).json({authenticated: isAllowed});
  } catch (e) {
    console.log("[POST] error in wheel:", (e as Error).message);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;