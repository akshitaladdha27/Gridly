import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';

const router = Router();

router.post('/', auth, createTask);
router.get('/', auth, getTasks);

router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

export default router;