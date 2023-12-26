import {InferAttributes, InferCreationAttributes, Model, CreationOptional} from "sequelize";

export interface BW_AreaModel
    extends Model<InferAttributes<BW_AreaModel>, InferCreationAttributes<BW_AreaModel>> {
    name: string;
    icon: string;
}

export interface BW_AreaValueModel
    extends Model<InferAttributes<BW_AreaValueModel>, InferCreationAttributes<BW_AreaValueModel>> {
    value: number;
    BWAreaId: number;
    BWWheelId: number;
}

export interface BW_TodoModel
    extends Model<InferAttributes<BW_TodoModel>, InferCreationAttributes<BW_TodoModel>> {
    id?: CreationOptional<number>;
    name: string;
    checked: CreationOptional<boolean>;
    BWWheelId?: number;
    BWAreaId?: number;
}

export interface BW_WheelModel
    extends Model<InferAttributes<BW_WheelModel>, InferCreationAttributes<BW_WheelModel>> {
    id?: CreationOptional<number>;
    date: string;
}