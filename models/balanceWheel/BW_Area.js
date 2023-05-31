module.exports = (sequelize, DataTypes) => {
  const BW_Area = sequelize.define("BW_Area", {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    icon: { type: DataTypes.STRING, allowNull: false },
  });

  BW_Area.associate = function ({ BW_AreaValue, BW_Todo }) {
    BW_Area.hasMany(BW_AreaValue);
    BW_Area.hasMany(BW_Todo);
  }

  return BW_Area;
};
