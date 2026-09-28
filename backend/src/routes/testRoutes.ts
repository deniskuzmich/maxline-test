import { Router } from 'express';
import { saveTestResult } from '../controllers/testController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/result', authMiddleware, saveTestResult);

export default router;