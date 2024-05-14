import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();

// Import middlewares
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
import { NotFoundError } from './errors/customErrors';

// Import routes
import authRoute from './routes/authRoute';

// Middlewares
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoute);

// Error handlers
app.use('*', (req, res) => {
  throw new NotFoundError("Route doesn't exist");
});
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
