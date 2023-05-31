module.exports = (sequelize, DataTypes) => {
  const VW_Category = sequelize.define("VW_Category", {
    name: { type: DataTypes.STRING, allowNull: false },
  });

  VW_Category.associate = function ({ VW_Clothes }) {
    VW_Category.hasMany(VW_Clothes);
  }

  return VW_Category;
};
