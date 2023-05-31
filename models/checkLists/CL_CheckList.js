module.exports = (sequelize, DataTypes) => {
    const CL_CheckList = sequelize.define("CL_CheckList", {
        name: { type: DataTypes.STRING, allowNull: false },
    });

    CL_CheckList.associate = function ({ CL_Todo }) {
        CL_CheckList.hasMany(CL_Todo, { onDelete: 'cascade' });

    }

    return CL_CheckList;
};
