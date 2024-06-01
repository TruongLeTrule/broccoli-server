import { NextFunction, Request, RequestHandler } from 'express';
import {
  body,
  validationResult,
  ValidationChain,
  param,
} from 'express-validator';
import { ingredientType, mealType } from '@prisma/client';
import { findUniqueMealRepository } from '../repositories/meal.repository';
import { BadRequestError, NotFoundError } from '../utils/customErrors';
import { findUniqueIngredientsRepository } from '../repositories/ingredient.repository';
import { findUserByUsernameRepository } from '../repositories/user.repository';

export const checkValidation: RequestHandler = (
  req: Request,
  _: any,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg = errors.array().map(({ msg }) => msg)[0];

    if (msg.startsWith('no')) throw new NotFoundError(msg);

    throw new BadRequestError(msg);
  }
  next();
};

export const validateLogin: ValidationChain[] = [
  body('username').notEmpty().withMessage('username is required'),
  body('password').notEmpty().withMessage('password is required'),
];

export const validateRegister: ValidationChain[] = [
  body('username')
    .notEmpty()
    .withMessage('username is required')
    .isLength({ min: 6 })
    .withMessage('username must be at least 6 characters long')
    .custom(async (value) => {
      const isUsernameExist = await findUserByUsernameRepository(value);
      if (isUsernameExist)
        throw new BadRequestError(`username ${value} already exists`);
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('username must be at least 6 characters long'),
  body('fullName').notEmpty().withMessage('fullName is required'),
];

export const validateUpdateUser: ValidationChain[] = [
  body('username')
    .notEmpty()
    .withMessage('username is required')
    .isLength({ min: 6 })
    .withMessage('username must be at least 6 characters long')
    .custom(async (username, { req }) => {
      const user = await findUserByUsernameRepository(username);
      if (user && user.userId === req.user.userId)
        throw new BadRequestError(`username ${username} already exists`);
    }),
  body('fullName').notEmpty().withMessage('fullName is required'),
];

export const validateCreateOrUpdateIngredient: ValidationChain[] = [
  body('ingredientName').notEmpty().withMessage('ingredient name is required'),
  body('ingredientType')
    .isIn(Object.values(ingredientType))
    .withMessage(
      `ingredient type must be ${Object.values(ingredientType).join(', ')}`
    ),
  body('nutrients')
    .isArray({ min: 1 })
    .withMessage('ingredient must have nutrient information'),
  body('nutrients.*.nutrientId')
    .notEmpty()
    .withMessage('nutrient id is required'),
];

export const validateCreateOrUpdateMeal: ValidationChain[] = [
  body('mealName').notEmpty().withMessage('meal name is required'),
  body('mealType')
    .isIn(Object.values(mealType))
    .withMessage(
      `ingredient type must be ${Object.values(mealType).join(', ')}`
    ),
  body('ingredients')
    .isArray({ min: 1 })
    .withMessage('meal must have at least one ingredient'),
  body('ingredients.*.ingredientId')
    .notEmpty()
    .withMessage('ingredient id is required'),
  body('ingredients.*.ingredientUnit')
    .notEmpty()
    .withMessage('ingredient unit is required'),
  body('ingredients.*.ingredientValue')
    .isFloat({ gt: 0 })
    .withMessage('ingredient value must greater than zero'),
];

export const validateCreateOrUpdateUserTarget: ValidationChain[] = [
  body('nutrients')
    .isArray({ min: 1 })
    .withMessage('please provide at least one user nutrient target'),
  body('nutrients.*.nutrientId')
    .notEmpty()
    .withMessage('nutrient id is required'),
  body('nutrients.*.targetNutrientValue')
    .isFloat({ gt: 0 })
    .withMessage('target nutrient value must greater than zero'),
];

export const validateMealIdParam: ValidationChain = param('id').custom(
  async (value) => {
    const isMealExist = await findUniqueMealRepository(value);
    if (!isMealExist) throw new NotFoundError(`no meal with id ${value}`);
  }
);

export const validateIngredientIdParam: ValidationChain = param('id').custom(
  async (value) => {
    const isIngredientExist = await findUniqueIngredientsRepository(value);
    if (!isIngredientExist)
      throw new NotFoundError(`no ingredient with id ${value}`);
  }
);
