import { ingredientTypeEnum } from '@prisma/client';

export interface CreateOrUpdateIngredientDto {
  ingredientName: string;
  ingredientType: ingredientTypeEnum;
  nutrients: Array<{
    nutrientValueOn100g: number;
    nutrientId: number;
  }>;
}
