module.exports = (sequelize, DataTypes) => {
    const CL_Todo = sequelize.define("CL_Todo", {
        name: { type: DataTypes.STRING , allowNull: false },
        checked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        date: { type: DataTypes.DATE, allowNull: true },
    });

    CL_Todo.associate = function ({ CL_CheckList }) {
        CL_Todo.belongsTo(CL_CheckList);
    }

    return CL_Todo;
};
