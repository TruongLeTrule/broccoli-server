import { PrismaClient } from '@prisma/client';
import { CreateOrUpdateIngredientDto } from '../dtos/ingredient.dto';

const prisma = new PrismaClient();

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

const createOrUpdateIngredientRepository = async (
  createIngredientRequest: CreateOrUpdateIngredientDto,
  id?: number
) => {
  const { ingredientName, ingredientType, nutrients } = createIngredientRequest;

  if (id)
    return await prisma.ingredient.update({
      where: {
        ingredientId: id,
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

const deleteIngredientRepository = (id: number) => {
  return prisma.ingredient.delete({
    where: {
      ingredientId: id,
    },
  });
};

export {
  findIngredientByNameRepository,
  findIngredientsRepository,
  findIngredientByIdRepository,
  deleteIngredientRepository,
  createOrUpdateIngredientRepository,
};
