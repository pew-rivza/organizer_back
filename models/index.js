const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = require("config");

const basename  = path.basename(__filename);
const database = config.get("database");
const sequelize = new Sequelize(...database);

const db = {};

fs
  .readdirSync(__dirname)
  .filter(directory => {
    return (!directory.includes("."));
  })
  .forEach(directory => {
    fs.readdirSync(path.join(__dirname, directory))
      .filter(file => {
        return (file.indexOf('.') !== 0)
          && (file !== basename)
          && (file.slice(-3) === '.js');
      })
      .forEach(file => {
        const model = require(path.join(__dirname, directory, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model;
      });
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
