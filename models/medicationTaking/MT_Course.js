module.exports = (sequelize, DataTypes) => {
  const MT_Course = sequelize.define("MT_Course", {
    start: { type: DataTypes.DATE, allowNull: false },
    doctor: { type: DataTypes.STRING, allowNull: false },
    diagnosis: { type: DataTypes.STRING, allowNull: false },
  });

  MT_Course.associate = function ({ MT_Medication }) {
    MT_Course.hasMany(MT_Medication);
  }

  return MT_Course;
};
