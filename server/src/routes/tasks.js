/**
 * Task routes: all require JWT.
 */
import { Router } from 'express';
import { jwtAuth } from '../middleware/auth.js';
import * as taskController from '../controllers/taskController.js';

const router = Router();

router.use(jwtAuth);

router.get('/recent', taskController.getRecent);
router.get('/', taskController.getPending);
router.post('/', taskController.create);
router.post('/:id/complete', taskController.complete);

export default router;
