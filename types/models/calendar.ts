import {CreationOptional, InferAttributes, InferCreationAttributes, Model} from "sequelize";

export interface CR_LookModel
    extends Model<InferAttributes<CR_LookModel>, InferCreationAttributes<CR_LookModel>> {
    date: Date;
    VWLookId?: number;
}
export interface CR_MedicationModel
    extends Model<InferAttributes<CR_MedicationModel>, InferCreationAttributes<CR_MedicationModel>> {
    id?: CreationOptional<number>;
    date: Date;
    timesOfDay: string;
    medicationId: number;
}