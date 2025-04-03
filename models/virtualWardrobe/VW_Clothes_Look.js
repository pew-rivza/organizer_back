module.exports = (sequelize, DataTypes) => {
  const VW_Clothes_Look = sequelize.define("VW_Clothes_Look", {
    x: { type: DataTypes.FLOAT, allowNull: false },
    y: { type: DataTypes.FLOAT, allowNull: false },
    idOnCanvas: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    width: { type: DataTypes.FLOAT, allowNull: false },
    height: { type: DataTypes.FLOAT, allowNull: false },
    offsetX: { type: DataTypes.FLOAT, allowNull: false },
    offsetY: { type: DataTypes.FLOAT, allowNull: false },
    zIndex: { type: DataTypes.INTEGER, allowNull: false },
  });

  return VW_Clothes_Look;
};
