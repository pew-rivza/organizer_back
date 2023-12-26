import fs from "fs";
import path from "path";
import config from "config";
import {Sequelize, DataTypes} from "sequelize";

import {Database, DatabaseConfig, DBModels, ModelsEntities, ModelsNames} from "../types/other";

const basename: string  = path.basename(__filename);
const database: DatabaseConfig = config.get("database");
const sequelize: Sequelize = new Sequelize(...database);
const models: DBModels = {} as DBModels;

fs
  .readdirSync(__dirname)
  .filter((fileSystemObject: string) => {
    return (!fileSystemObject.includes("."));
  })
  .forEach((directory: string) => {
    fs.readdirSync(path.join(__dirname, directory))
      .filter((file: string) => {
        return (file.indexOf('.') !== 0)
          && (file !== basename)
          && (file.slice(-3) === '.ts');
      })
      .forEach((file: string) => {
        const model: ModelsEntities = require(path.join(__dirname, directory, file))(sequelize, DataTypes);
        const modelName = model.name as ModelsNames;
        models[modelName] = model;
      });
  });

Object.keys(models).length && Object.keys(models).forEach(modelName => {
  const name = modelName as ModelsNames;
  if (models[name].associate) {
    models[name].associate?.(models);
  }
});

const sequelizes = { Sequelize, sequelize };

const db: Database = {
  ...models,
  ...sequelizes,
}

export default db;
module.exports = db;
