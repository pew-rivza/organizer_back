import {Sequelize} from "sequelize";
import {DataType, ModelType} from "../../types/other";
import {MT_CourseModel} from "../../types/models/medicationTaking";

module.exports = (sequelize: Sequelize, DataTypes: DataType) => {
  const MT_Course: ModelType<MT_CourseModel> = sequelize.define<MT_CourseModel>("MT_Course", {
    start: { type: DataTypes.DATE, allowNull: false },
    doctor: { type: DataTypes.STRING, allowNull: false },
    diagnosis: { type: DataTypes.STRING, allowNull: false },
  });

  MT_Course.associate = function ({ MT_Medication }) {
    MT_Course.hasMany(MT_Medication);
  }

  return MT_Course;
};
