import {
  findMealWithMealTimesRepository,
  findManyMealNutrientRepository,
} from '../repositories/meal.repository';
import {
  ChosenMealDto,
  MealPlanNutrientDto,
  ExistMealsDto,
} from '../dtos/mealPlan.dto';

const createDayPlanService = async (
  calories: number,
  existMeals: ExistMealsDto,
  userId: string
) => {
  const chosenMeals = await chooseMeals(calories, existMeals);

  const nutrients = await calculateMealPlanNutrient(chosenMeals);

  return {
    chosenMeals,
    nutrients,
    appliedDate: new Date(Date.now()),
    userId,
  };
};

const chooseMeals = async (
  calories: number,
  existMeals: ExistMealsDto,
  targetCalories = 0
): Promise<Array<ChosenMealDto>> => {
  const mealTimes = await findMealWithMealTimesRepository();

  const chosenMeals: Array<ChosenMealDto> = [];

  while (targetCalories < calories) {
    mealTimes.forEach(({ mealTime, meals }) => {
      if (targetCalories >= calories) return;

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

      existMeals[mealTime].push(chosenMealId);

      // If meal already in choosing list, quantity += 1
      const existChosenMealIndex = chosenMeals.findIndex(
        (item) => item.mealId === chosenMealId
      );
      if (existChosenMealIndex === -1) {
        chosenMeals.push({
          mealId: chosenMealId,
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

  const chosenMealsNutrient = await getChosenMealNutrient(chosenMealIds);

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

export { createDayPlanService };
