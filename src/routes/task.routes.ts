import express from 'express';

import * as taskController from '../controllers/task.controller';
import {
    validate, validateComment, validateId, validateTask
} from '../middlewares/validation.middlewares';

const router = express.Router();

router.post('/', validateTask, validate, taskController.createTask);
router.post('/:id/comments', validateId, validateComment, validate, taskController.addComment);

router.get('/', taskController.getTasks);
router.get('/:id', validateId, validate, taskController.getTask);

router.put('/:id', validateId, validateTask, validate, taskController.updateTask);

router.delete('/:id', validateId, validate, taskController.deleteTask);

export default router;