import {Sequelize} from "sequelize";
import {DataType, ModelType} from "../../types/other";
import {CL_CheckListModel} from "../../types/models/checkLists";

module.exports = (sequelize: Sequelize, DataTypes: DataType) => {
    const CL_CheckList: ModelType<CL_CheckListModel> = sequelize.define<CL_CheckListModel>("CL_CheckList", {
        name: { type: DataTypes.STRING, allowNull: false },
    });

    CL_CheckList.associate = function ({ CL_Todo }) {
        CL_CheckList.hasMany(CL_Todo, { onDelete: 'cascade' });

    }

    return CL_CheckList;
};
