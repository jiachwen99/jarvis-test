import express from 'express';
import taskRoutes from './task.routes';

const router = express.Router();

router.use('/tasks', taskRoutes);

export default router