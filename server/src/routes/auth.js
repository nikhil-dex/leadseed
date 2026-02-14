/**
 * Auth routes: LinkedIn OAuth (no JWT required).
 */
import { Router } from 'express';
import * as authController from '../controllers/authController.js';

const router = Router();

router.get('/linkedin', authController.linkedInAuth);
router.get('/linkedin/callback', authController.linkedInCallback);

export default router;
