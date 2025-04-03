module.exports = (sequelize, DataTypes) => {
  const BW_AreaValue = sequelize.define("BW_AreaValue", {
    value: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  });

  BW_AreaValue.associate = function ({ BW_Area, BW_Wheel }) {
    BW_AreaValue.belongsTo(BW_Wheel, { onDelete: 'cascade' });
    BW_AreaValue.belongsTo(BW_Area);
  }

  return BW_AreaValue;
};
