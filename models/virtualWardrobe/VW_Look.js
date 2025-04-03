module.exports = (sequelize, DataTypes) => {
  const VW_Look = sequelize.define("VW_Look", {
    canvasSize: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
  });

  VW_Look.associate = function ({ VW_Look, VW_Clothes, CR_Look }) {
    VW_Look.belongsToMany(VW_Clothes, { through: { model: 'VW_Clothes_Look', unique: false} });
    VW_Look.hasMany(CR_Look);
  }

  return VW_Look;
};
