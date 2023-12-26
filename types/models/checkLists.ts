import {CreationOptional, InferAttributes, InferCreationAttributes, Model} from "sequelize";

export interface CL_CheckListModel
    extends Model<InferAttributes<CL_CheckListModel>, InferCreationAttributes<CL_CheckListModel>> {
    id?: CreationOptional<number>;
    name: string;
}
export interface CL_TodoModel
    extends Model<InferAttributes<CL_TodoModel>, InferCreationAttributes<CL_TodoModel>> {
    id?: CreationOptional<number>;
    name: string;
    checked: CreationOptional<boolean>;
    date: Date;
    CLCheckListId?: number;
}