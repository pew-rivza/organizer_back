import {ClothesCanvasParams, VW_Clothes_LookModel, VW_ClothesModel, VW_LookModel} from "./models/virtualWardrobe";

export type EditedAreaValues = { [index: string]: { areaId: number, value: number } };

export interface ClothesBlob extends ClothesCanvasParams, VW_ClothesModel {}

export type LookWithBlob = {
    id: number,
    canvasSize: number,
    image: string,
    clothes: ClothesBlob[],
}

export type LookInfo = VW_LookModel & {clothes: VW_Clothes_LookModel[]};