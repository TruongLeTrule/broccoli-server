import { PrismaClient } from '@prisma/client';
import { CreateOrUpdateIngredientDto } from '../dtos/ingredient.dto';

const prisma = new PrismaClient();

const findRelevantMeals = async (ingredientId: string | number) => {
  return await prisma.ingredient.findFirst({
    where: {
      ingredientId: Number(ingredientId),
    },
    select: {
      meals: {
        select: {
          mealId: true,
        },
      },
    },
  });
};

const findUniqueIngredientsRepository = async (
  ingredientId: string | number
) => {
  return await prisma.ingredient.findUnique({
    where: {
      ingredientId: Number(ingredientId),
    },
  });
};

const findIngredientsRepository = async () => {
  return await prisma.ingredient.findMany({
    select: {
      ingredientId: true,
      ingredientName: true,
      ingredientType: true,
    },
  });
};

const findIngredientByNameRepository = async (ingredientName: string) => {
  const ingredients = await prisma.ingredient.findMany({
    where: {
      ingredientName: {
        contains: ingredientName,
      },
    },
  });
  return ingredients;
};

const findIngredientByIdRepository = async (ingredientId: number) => {
  return await prisma.ingredient.findFirst({
    where: {
      ingredientId,
    },
    include: {
      nutrients: {
        select: {
          nutrientValueOn100g: true,
          nutrient: true,
        },
      },
    },
  });
};

const findManyIngredientNutrientRepository = async (
  ingredientIds: Array<number>
) => {
  return prisma.ingredient.findMany({
    where: {
      ingredientId: { in: ingredientIds },
    },
    select: {
      nutrients: {
        select: {
          nutrientValueOn100g: true,
          nutrientId: true,
        },
      },
    },
  });
};

const findUnitCovertRepository = async () => {
  return prisma.ingredientUnitCovert.findMany({});
};

const createOrUpdateIngredientRepository = async (
  createIngredientRequest: CreateOrUpdateIngredientDto,
  id?: string | number
) => {
  const { ingredientName, ingredientType, nutrients } = createIngredientRequest;

  if (id)
    return await prisma.ingredient.update({
      where: {
        ingredientId: Number(id),
      },
      data: {
        ingredientName,
        ingredientType,
        nutrients: {
          deleteMany: {},
          create: nutrients,
        },
      },
    });

  return await prisma.ingredient.create({
    data: {
      ingredientName,
      ingredientType,
      nutrients: {
        create: nutrients,
      },
    },
  });
};

const deleteIngredientRepository = (id: number | string) => {
  return prisma.ingredient.delete({
    where: {
      ingredientId: Number(id),
    },
  });
};

export {
  findIngredientByNameRepository,
  findIngredientsRepository,
  findIngredientByIdRepository,
  deleteIngredientRepository,
  createOrUpdateIngredientRepository,
  findUniqueIngredientsRepository,
  findManyIngredientNutrientRepository,
  findUnitCovertRepository,
  findRelevantMeals,
};
