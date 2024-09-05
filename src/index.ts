import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { rateLimit } from 'express-rate-limit';

import { errorHandler } from './middlewares/errors.middlewares.';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, X-CallbackType, Content-Type, Accept");
  res.header("Cache-Control", "no-cache");
  if ("OPTIONS" == req.method) 
      res.send(200);
  else 
      next();
});
app.use(rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100 
}));
app.use('/api', routes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;