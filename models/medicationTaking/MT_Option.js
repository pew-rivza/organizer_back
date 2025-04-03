module.exports = (sequelize, DataTypes) => {
  return  sequelize.define("MT_Option", {
    key: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.STRING, allowNull: true },
    one: { type: DataTypes.STRING, allowNull: true },
    few: { type: DataTypes.STRING, allowNull: true },
    many: { type: DataTypes.STRING, allowNull: true },
    nominativeOne: { type: DataTypes.STRING, allowNull: true },
    feminine: { type: DataTypes.STRING, allowNull: true },
    masculine: { type: DataTypes.STRING, allowNull: true },
    neuter: { type: DataTypes.STRING, allowNull: true },
  });
};
