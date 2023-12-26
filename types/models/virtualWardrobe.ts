import {CreationOptional, InferAttributes, InferCreationAttributes, Model} from "sequelize";

export interface VW_CategoryModel
    extends Model<InferAttributes<VW_CategoryModel>, InferCreationAttributes<VW_CategoryModel>> {
    name: string;
    setVW_Category?: CreationOptional<Function>;
}

export interface VW_ClothesModel
    extends Model<InferAttributes<VW_ClothesModel>, InferCreationAttributes<VW_ClothesModel>> {
    image: string;
    setVW_Category?: CreationOptional<Function>;
    VWCategoryId?: CreationOptional<number>;
    id?: CreationOptional<number>,
}

export interface ClothesCanvasParams {
    idOnCanvas: string,
    x: number;
    y: number;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    zIndex: number;
}

export interface VW_Clothes_LookModel
    extends Model<InferAttributes<VW_Clothes_LookModel>, InferCreationAttributes<VW_Clothes_LookModel>>, ClothesCanvasParams {
    id?: CreationOptional<number>;
    VWLookId?: CreationOptional<number>;
    VWClotheId?: CreationOptional<number>
}

export interface VW_LookModel
    extends Model<InferAttributes<VW_LookModel>, InferCreationAttributes<VW_LookModel>> {
    canvasSize: number;
    image: string;
    id?: CreationOptional<number>;
}
