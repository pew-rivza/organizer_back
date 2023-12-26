import {Model, ModelStatic, Options, Sequelize} from "sequelize";
import {BW_AreaModel, BW_AreaValueModel, BW_TodoModel, BW_WheelModel} from "./models/balanceWheel";
import {CR_LookModel, CR_MedicationModel} from "./models/calendar";
import {CL_CheckListModel, CL_TodoModel} from "./models/checkLists";
import {MT_CourseModel, MT_MedicationModel, MT_OptionModel} from "./models/medicationTaking";
import {VW_CategoryModel, VW_Clothes_LookModel, VW_ClothesModel, VW_LookModel} from "./models/virtualWardrobe";

export interface Database extends DBModels {
    sequelize: Sequelize,
    Sequelize: typeof Sequelize,
}

export interface DBModels {
    BW_Area: ModelType<BW_AreaModel>,
    BW_AreaValue: ModelType<BW_AreaValueModel>,
    BW_Todo: ModelType<BW_TodoModel>,
    BW_Wheel: ModelType<BW_WheelModel>,

    CR_Look: ModelType<CR_LookModel>,
    CR_Medication: ModelType<CR_MedicationModel>,

    CL_CheckList: ModelType<CL_CheckListModel>,
    CL_Todo: ModelType<CL_TodoModel>,

    MT_Course: ModelType<MT_CourseModel>,
    MT_Medication: ModelType<MT_MedicationModel>,
    MT_Option: ModelType<MT_OptionModel>,

    VW_Category: ModelType<VW_CategoryModel>,
    VW_Clothes: ModelType<VW_ClothesModel>,
    VW_Clothes_Look: ModelType<VW_Clothes_LookModel>,
    VW_Look: ModelType<VW_LookModel>,
}

export type ModelsEntities =
    ModelType<BW_AreaModel> &
    ModelType<BW_AreaValueModel> &
    ModelType<BW_TodoModel> &
    ModelType<BW_WheelModel> &
    ModelType<CR_LookModel> &
    ModelType<CR_MedicationModel> &
    ModelType<CL_CheckListModel> &
    ModelType<CL_TodoModel> &
    ModelType<MT_CourseModel> &
    ModelType<MT_MedicationModel> &
    ModelType<MT_OptionModel> &
    ModelType<VW_CategoryModel> &
    ModelType<VW_ClothesModel> &
    ModelType<VW_Clothes_LookModel> &
    ModelType<VW_LookModel>;

export type ModelsNames =
    "BW_Area" |
    "BW_AreaValue" |
    "BW_Todo" |
    "BW_Wheel" |
    "CR_Look" |
    "CR_Medication" |
    "CL_CheckList" |
    "CL_Todo" |
    "MT_Course" |
    "MT_Medication" |
    "MT_Option" |
    "VW_Category" |
    "VW_Clothes" |
    "VW_Clothes_Look" |
    "VW_Look";

export interface ModelType<ModelT extends Model<any, any>> extends ModelStatic<ModelT> {
    associate?: (database: DBModels) => void
}

export type DataType = Record<string, any>;

export type DatabaseConfig = [string, string, string, Options]