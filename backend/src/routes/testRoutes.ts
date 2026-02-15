import { Router } from 'express';
import { saveResult } from '../controllers/testController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/result', authMiddleware, saveResult);

export default router;