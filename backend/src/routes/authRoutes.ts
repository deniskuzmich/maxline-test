import { Router } from 'express';
import {register, login, refresh} from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/auth/refresh', refresh);

export default router;