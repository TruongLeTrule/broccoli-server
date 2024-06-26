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
import { authenticateMiddleware } from './middlewares/authentication.middleware';

// Import routes
import {
  authRoute,
  ingredientRoute,
  mealRoute,
  nutrientRoute,
  userRoute,
  plannerRoute,
} from './routes';

dotenv.config();

const app = express();
const BASE_URL = '/api/v1';
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(`${BASE_URL}/auth`, authRoute);
app.use(`${BASE_URL}/meals`, mealRoute);
app.use(`${BASE_URL}/ingredients`, ingredientRoute);
app.use(`${BASE_URL}/nutrients`, nutrientRoute);
app.use(`${BASE_URL}/planner`, plannerRoute);
app.use(`${BASE_URL}/user`, authenticateMiddleware, userRoute);

// Error handlers
app.use('*', (req, res) => {
  throw new NotFoundError('Route not exist');
});
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
