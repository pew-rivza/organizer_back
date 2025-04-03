module.exports = (sequelize, DataTypes) => {
  const CR_Look = sequelize.define("CR_Look", {
    date: { type: DataTypes.DATE, allowNull: false, primaryKey: true },
  });

  CR_Look.associate = function ({ VW_Look }) {
    CR_Look.belongsTo(VW_Look);
  }

  return CR_Look;
};
