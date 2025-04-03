module.exports = (sequelize, DataTypes) => {
  const CR_Medication = sequelize.define("CR_Medication", {
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
