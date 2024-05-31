export interface CreateUserTargetDto {
  nutrients: Array<{
    nutrientId: number;
    targetNutrientValue: number;
  }>;
}
