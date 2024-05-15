import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';

// Import middlewares
import cookieParser from 'cookie-parser';
import errorHandlerMiddleware from './middlewares/errorHandler.middleware';
import { NotFoundError } from './utils/customErrors';
import { authenticationUser } from './middlewares/authenticate.middleware';

// Import routes
import authRoute from './routes/auth.route';
import mealRoute from './routes/meal.route';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/meal', authenticationUser, mealRoute);

// Error handlers
app.use('*', (req, res) => {
  throw new NotFoundError('Route not exist');
});
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
