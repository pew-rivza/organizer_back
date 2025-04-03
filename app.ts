import db from "./models";
import express from "express";
import config from "config";
import path from "path";
import {Error} from "sequelize";

const app = express();
const PORT: string = config.get("port");

app.use(express.json({ limit: "200mb" }));

app.use('/uploads/clothes', express.static(__dirname + '/uploads/clothes'));

app.use("/api/balancewheel/area", require("./routes/balanceWheel/BW_area.routes"));
app.use("/api/balancewheel/wheel", require("./routes/balanceWheel/BW_wheel.routes"));
app.use("/api/balancewheel/areavalue", require("./routes/balanceWheel/BW_areavalue.routes"));
app.use("/api/balancewheel/todo", require("./routes/balanceWheel/BW_todo.routes"));

app.use("/api/medicationtaking/option", require("./routes/medicationTaking/MT_option.routes"));
app.use("/api/medicationtaking/course", require("./routes/medicationTaking/MT_course.routes"));
app.use("/api/medicationtaking/medication", require("./routes/medicationTaking/MT_medication.routes"));

app.use("/api/calendar/medication", require("./routes/calendar/CR_medication.routes"));
app.use("/api/calendar/look", require("./routes/calendar/CR_look.routes"));

app.use("/api/virtualwardrobe/category", require("./routes/virtualWardrobe/VW_category.routes"));
app.use("/api/virtualwardrobe/clothes", require("./routes/virtualWardrobe/VW_clothes.routes"));
app.use("/api/virtualwardrobe/look", require("./routes/virtualWardrobe/VW_look.routes"));

app.use("/api/checklists/checklist", require("./routes/checkLists/CL_checklist.routes"));
app.use("/api/checklists/todo", require("./routes/checkLists/CL_todo.routes"));

app.use("/api/auth", require("./routes/auth.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

async function start() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    // await db.CL_CheckList.sync({force: true});
    // db.sequelize.sync({ force: false, alter: true })
    app.listen(PORT, () => {
      console.log(`App is started on ${PORT} port!`);
    });
  } catch (e) {
    console.log("error in server or db start:", (e as Error).message);
  }
}

start()
  .then(() => {
    console.log("Project started! 💃");
  });
