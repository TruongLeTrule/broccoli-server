import {
  findMealWithMealTimesRepository,
  findManyMealNutrientRepository,
  findMealByMealTimesRepository,
} from '../repositories/meal.repository';
import {
  ChosenMealDto,
  MealPlanNutrientDto,
  ExistMealsDto,
} from '../dtos/mealPlan.dto';
import {
  createDayPlanRepository,
  deleteChosenMealRepository,
  findMealPlanRepository,
  updateDayPlanRepository,
} from '../repositories/mealPlan.repository';
import { mealTimeEnum } from '@prisma/client';

const updateOneMealService = async (
  existMeals: ExistMealsDto,
  appliedDate: Date,
  mealId: number,
  mealTime: mealTimeEnum,
  userId: string
) => {
  const mealPlan = await findMealPlanRepository(appliedDate, userId);

  await deleteChosenMealRepository(
    mealId,
    mealPlan?.mealPlanId as string,
    mealTime
  );

  const updatedMealPlan = await findMealPlanRepository(appliedDate, userId);

  const chosenMeals = updatedMealPlan?.chosenMeals.map(
    ({ meal, ...mealInfo }) => ({
      ...meal,
      ...mealInfo,
    })
  );

  const newMeal = await chooseMealsInMealTime(mealTime);

  const nutrients = await calculateMealPlanNutrient([
    ...(chosenMeals as Array<ChosenMealDto>),
    ...newMeal,
  ]);

  const mealPlanWithNewMeals = await updateDayPlanRepository({
    chosenMeals: [...(chosenMeals as Array<ChosenMealDto>), ...newMeal],
    nutrients,
    userId,
    appliedDate,
  });

  return {
    newMealPlan: mealPlanWithNewMeals,
    chosenMeals: [...(chosenMeals as Array<ChosenMealDto>), ...newMeal],
    nutrients,
  };
};

const chooseMealsInMealTime = async (
  mealTime: mealTimeEnum
): Promise<Array<ChosenMealDto>> => {
  const mealsByMealTime = await findMealByMealTimesRepository(mealTime);

  const chosenMeals: Array<ChosenMealDto> = [];

  const chosenMealId = chooseRandomMeal(
    mealsByMealTime?.meals.map(({ meal }) => meal.mealId) as Array<number>,
    []
  );

  const chosenMeal = mealsByMealTime?.meals.find(
    (meal) => meal.meal.mealId === chosenMealId
  )?.meal;

  chosenMeals.push({
    mealId: chosenMeal?.mealId,
    mealName: chosenMeal?.mealName,
    imgURL: chosenMeal?.imgURL,
    quantity: 1,
    mealTime,
  });

  return chosenMeals;
};

const createDayPlanService = async (
  calories: number | undefined,
  existMeals: ExistMealsDto,
  appliedDate: Date,
  userId: string
) => {
  if (calories === undefined) return;

  const chosenMeals = await chooseMeals(calories, existMeals);

  const nutrients = await calculateMealPlanNutrient(chosenMeals);

  const mealPlan = await createDayPlanRepository({
    chosenMeals,
    appliedDate,
    userId,
    nutrients,
  });

  return {
    mealPlan,
    chosenMeals,
    nutrients,
  };
};

const chooseMeals = async (
  calories: number,
  existMeals: ExistMealsDto,
  targetCalories = 0
): Promise<Array<ChosenMealDto>> => {
  const mealTimes = await findMealWithMealTimesRepository();

  const chosenMeals: Array<ChosenMealDto> = [];

  while (targetCalories < calories - 100) {
    mealTimes.forEach(({ mealTime, meals }) => {
      if (targetCalories >= calories - 100) return;

      // If exist meals reach limit or undefined, set it []
      if (
        !existMeals[mealTime] ||
        existMeals[mealTime]?.length >= meals.length - 1
      )
        existMeals[mealTime] = [];

      const chosenMealId = chooseRandomMeal(
        meals.map(({ meal }) => meal.mealId),
        existMeals[mealTime]
      );

      const chosenMeal = meals.find(
        (meal) => meal.meal.mealId === chosenMealId
      )?.meal;

      existMeals[mealTime].push(chosenMealId);

      // If meal already in choosing list, quantity += 1
      const existChosenMealIndex = chosenMeals.findIndex(
        (item) => item.mealId === chosenMealId
      );
      if (existChosenMealIndex === -1) {
        chosenMeals.push({
          mealId: chosenMeal?.mealId,
          mealName: chosenMeal?.mealName,
          imgURL: chosenMeal?.imgURL,
          quantity: 1,
          mealTime,
        });
      } else {
        chosenMeals[existChosenMealIndex].quantity += 1;
      }

      targetCalories +=
        meals.find(({ meal }) => meal.mealId === chosenMealId)?.meal
          .nutrients[0].nutrientValue || 0;
      console.log(
        '===============Current calories: ',
        targetCalories,
        ' ==============='
      );
    });
  }

  return chosenMeals;
};

const chooseRandomMeal = (meals: Array<number>, existMeals: Array<number>) => {
  let chosenMealId;
  do {
    const randomIndex = Math.floor(Math.random() * meals.length);
    chosenMealId = meals[randomIndex];
  } while (existMeals.includes(chosenMealId));
  return chosenMealId;
};

const calculateMealPlanNutrient = async (
  chosenMeals: Array<ChosenMealDto>
): Promise<Array<MealPlanNutrientDto>> => {
  const chosenMealIds = chosenMeals.map(({ mealId }) => mealId);

  const chosenMealsNutrient = await getChosenMealNutrient(
    chosenMealIds as Array<number>
  );

  let mealPlanNutrients: Array<MealPlanNutrientDto> = [];

  chosenMealsNutrient.forEach((mealNutrient) => {
    mealPlanNutrients = mealNutrient.map(
      ({ nutrientId, nutrientValue, mealId }) => {
        const currNutrientValue =
          mealPlanNutrients.find(
            (currNutrient) => currNutrient.nutrientId === nutrientId
          )?.nutrientValue || 0;

        const mealQuantity =
          chosenMeals.find((currMeal) => currMeal.mealId === mealId)
            ?.quantity || 1;

        return {
          nutrientId,
          nutrientValue: currNutrientValue + nutrientValue * mealQuantity,
        };
      }
    );
  });

  return mealPlanNutrients;
};

const getChosenMealNutrient = async (selectedMealIds: Array<number>) => {
  return (await findManyMealNutrientRepository(selectedMealIds)).map(
    ({ nutrients, mealId }) => {
      return nutrients.map(({ nutrientValue, nutrient }) => ({
        mealId,
        nutrientValue,
        ...nutrient,
      }));
    }
  );
};

const updateDayPlanService = async (
  calories: number | undefined,
  existMeals: ExistMealsDto,
  appliedDate: Date,
  userId: string
) => {
  if (calories === undefined) return;

  const chosenMeals = await chooseMeals(calories, existMeals);

  const nutrients = await calculateMealPlanNutrient(chosenMeals);

  const mealPlan = await updateDayPlanRepository({
    chosenMeals,
    appliedDate,
    userId,
    nutrients,
  });

  return {
    mealPlan,
    chosenMeals,
    nutrients,
  };
};

export { createDayPlanService, updateDayPlanService, updateOneMealService };
