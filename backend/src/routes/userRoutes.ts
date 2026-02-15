import { Router } from 'express';
import { getUsers, getMe, deleteUser, resetUserResults } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getUsers);
router.get('/me', authMiddleware, getMe);
router.delete('/:id', authMiddleware, deleteUser);
router.post('/:id/reset', authMiddleware, resetUserResults);

export default router;