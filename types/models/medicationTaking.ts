import {CreationOptional, InferAttributes, InferCreationAttributes, Model} from "sequelize";

export interface MT_CourseModel
    extends Model<InferAttributes<MT_CourseModel>, InferCreationAttributes<MT_CourseModel>> {
    id?: CreationOptional<number>;
    start: Date;
    doctor: string;
    diagnosis: string;
}

export interface MT_MedicationModel
    extends Model<InferAttributes<MT_MedicationModel>, InferCreationAttributes<MT_MedicationModel>> {
    name: string,
    count: number,
    countMeasureId: number,
    inWhichId: number,
    inId: number,
    routeOfAdministrationId: number,
    frequency: number,
    frequencyCount: number,
    frequencyMeasureId: number,
    timesOfDayId: number,
    mealTimeId: number,
    inBeforeCount: number,
    inBeforeMeasureId: number,
    periodCount: number,
    periodMeasureId: number,
    periodDateStart: Date,
    periodDateEnd: Date,
    comment: string,
    MTCourseId?: CreationOptional<number>,
    id?: CreationOptional<number>
}

export interface MT_OptionModel
    extends Model<InferAttributes<MT_OptionModel>, InferCreationAttributes<MT_OptionModel>> {
    key: string,
    value: string,
    one: string,
    few: string,
    many: string,
    nominativeOne: string,
    feminine: string,
    masculine: string,
    neuter: string,
}