import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

// Import middlewares
import cookieParser from 'cookie-parser';
import errorHandlerMiddleware from './middlewares/errorHandler.middleware';
import { NotFoundError } from './utils/customErrors';
import cors from 'cors';
import helmet from 'helmet';

// Import routes
import authRoute from './routes/auth.route';
import mealRoute from './routes/meal.route';
import ingredientRoute from './routes/ingredient.route';

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/meals', mealRoute);
app.use('/api/v1/ingredients', ingredientRoute);

// Error handlers
app.use('*', (req, res) => {
  throw new NotFoundError('Route not exist');
});
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
