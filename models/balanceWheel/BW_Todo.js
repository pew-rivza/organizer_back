module.exports = (sequelize, DataTypes) => {
  const BW_Todo = sequelize.define("BW_Todo", {
    name: { type: DataTypes.STRING , allowNull: false },
    checked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  });

  BW_Todo.associate = function ({ BW_Area, BW_Wheel }) {
    BW_Todo.belongsTo(BW_Wheel, { onDelete: 'cascade' });
    BW_Todo.belongsTo(BW_Area);
  }

  return BW_Todo;
};
