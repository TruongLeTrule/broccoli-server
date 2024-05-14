-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `hashedPassword` VARCHAR(191) NOT NULL,
    `imgUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPhysicalStat` (
    `id` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` ENUM('male', 'female', 'other') NOT NULL,
    `height` DOUBLE NOT NULL,
    `heightUnit` ENUM('m', 'cm') NOT NULL DEFAULT 'cm',
    `weightInKg` DOUBLE NOT NULL,
    `tdee` INTEGER NOT NULL,
    `activityLevelId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserPhysicalStat_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivityLevel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `activityLevelType` VARCHAR(191) NOT NULL,
    `coefficientValue` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MealPlan` (
    `id` VARCHAR(191) NOT NULL,
    `appliedDate` DATETIME(3) NOT NULL,
    `totalCalories` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChosenMeal` (
    `mealTime` ENUM('breakfast', 'lunch', 'dinner', 'snack') NOT NULL,
    `chosenMealQuantity` DOUBLE NOT NULL,
    `mealPlanId` VARCHAR(191) NOT NULL,
    `mealId` INTEGER NOT NULL,

    PRIMARY KEY (`mealPlanId`, `mealTime`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mealName` VARCHAR(191) NOT NULL,
    `caloriesPerServing` INTEGER NOT NULL,
    `mealType` ENUM('food', 'fruit', 'drink') NOT NULL DEFAULT 'food',
    `imgURL` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MealIngredient` (
    `ingredientValue` DOUBLE NOT NULL,
    `ingredientUnit` ENUM('g', 'tbsp', 'tsp', 'cup', 'dash') NOT NULL DEFAULT 'g',
    `mealId` INTEGER NOT NULL,
    `ingredientId` INTEGER NOT NULL,

    PRIMARY KEY (`mealId`, `ingredientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IngredientUnitCovert` (
    `ingredientUnit` ENUM('g', 'tbsp', 'tsp', 'cup', 'dash') NOT NULL,
    `covertToGrams` DOUBLE NOT NULL,

    PRIMARY KEY (`ingredientUnit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ingredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredientName` VARCHAR(191) NOT NULL,
    `ingredientCaloriesOn100g` INTEGER NOT NULL,
    `ingredientType` ENUM('meat', 'vegetable') NOT NULL DEFAULT 'meat',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IngredientNutrient` (
    `nutrientValueOn100g` DOUBLE NOT NULL,
    `ingredientId` INTEGER NOT NULL,
    `nutrientId` INTEGER NOT NULL,

    PRIMARY KEY (`ingredientId`, `nutrientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nutrient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nutrientName` VARCHAR(191) NOT NULL,
    `nutrientType` ENUM('macro', 'micro') NOT NULL DEFAULT 'macro',
    `nutrientUnit` ENUM('g', 'mg', 'mcg') NOT NULL DEFAULT 'g',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserPhysicalStat` ADD CONSTRAINT `UserPhysicalStat_activityLevelId_fkey` FOREIGN KEY (`activityLevelId`) REFERENCES `ActivityLevel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPhysicalStat` ADD CONSTRAINT `UserPhysicalStat_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealPlan` ADD CONSTRAINT `MealPlan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChosenMeal` ADD CONSTRAINT `ChosenMeal_mealPlanId_fkey` FOREIGN KEY (`mealPlanId`) REFERENCES `MealPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChosenMeal` ADD CONSTRAINT `ChosenMeal_mealId_fkey` FOREIGN KEY (`mealId`) REFERENCES `Meal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealIngredient` ADD CONSTRAINT `MealIngredient_ingredientUnit_fkey` FOREIGN KEY (`ingredientUnit`) REFERENCES `IngredientUnitCovert`(`ingredientUnit`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealIngredient` ADD CONSTRAINT `MealIngredient_mealId_fkey` FOREIGN KEY (`mealId`) REFERENCES `Meal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealIngredient` ADD CONSTRAINT `MealIngredient_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IngredientNutrient` ADD CONSTRAINT `IngredientNutrient_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IngredientNutrient` ADD CONSTRAINT `IngredientNutrient_nutrientId_fkey` FOREIGN KEY (`nutrientId`) REFERENCES `Nutrient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
