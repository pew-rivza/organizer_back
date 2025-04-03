module.exports = (sequelize, DataTypes) => {
  const BW_Wheel = sequelize.define("BW_Wheel", {
    date: { type: DataTypes.STRING, allowNull: false },
  });

  BW_Wheel.associate = function ({ BW_AreaValue, BW_Todo }) {
    BW_Wheel.hasMany(BW_AreaValue);
    BW_Wheel.hasMany(BW_Todo);
  }

  return BW_Wheel;
};
