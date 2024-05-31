import { ingredientType } from '@prisma/client';

export interface CreateOrUpdateIngredientDto {
  ingredientName: string;
  ingredientType: ingredientType;
  nutrients: Array<{
    nutrientValueOn100g: number;
    nutrientId: number;
  }>;
}
