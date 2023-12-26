import {Sequelize} from "sequelize";
import {DataType, ModelType} from "../../types/other";
import {CR_MedicationModel} from "../../types/models/calendar";

module.exports = (sequelize: Sequelize, DataTypes: DataType) => {
  const CR_Medication: ModelType<CR_MedicationModel> = sequelize.define<CR_MedicationModel>("CR_Medication", {
    date: { type: DataTypes.DATE, allowNull: false },
    timesOfDay: { type: DataTypes.STRING, allowNull: false },
    medicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "MT_Medications",
        key: "id"
      },
    },
  });

  return CR_Medication;
};
