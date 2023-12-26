import {Sequelize} from "sequelize";
import {DataType, ModelType} from "../../types/other";
import {CL_TodoModel} from "../../types/models/checkLists";

module.exports = (sequelize: Sequelize, DataTypes: DataType) => {
    const CL_Todo: ModelType<CL_TodoModel> = sequelize.define<CL_TodoModel>("CL_Todo", {
        name: { type: DataTypes.STRING , allowNull: false },
        checked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        date: { type: DataTypes.DATE, allowNull: true },
    });

    CL_Todo.associate = function ({ CL_CheckList }) {
        CL_Todo.belongsTo(CL_CheckList);
    }

    return CL_Todo;
};
