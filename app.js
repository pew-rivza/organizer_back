const express = require("express");
const config = require("config");
const db = require("./models");

const app = express();
app.use(express.json({ limit: "200mb", extended: true }));

app.use('/uploads/clothes', express.static(__dirname + '/uploads/clothes'));

const PORT = config.get("port");

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
    app.listen(PORT);
  } catch (e) {
    console.log("error in server or db start:", e.message);
  }
}

start()
  .then(() => {
    console.log("Database connection has been established successfully");
    console.log(`And app is started on ${PORT} port!`);
  });

// TODO: переписать бэк на клишку с миграциями + переписать на тс
// TODO: поставить линтер и преттиер в проект + гит
