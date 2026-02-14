/**
 * Lead routes: require JWT.
 */
import { Router } from 'express';
import { jwtAuth } from '../middleware/auth.js';
import * as leadController from '../controllers/leadController.js';

const router = Router();

router.use(jwtAuth);
router.get('/stats', leadController.getLeadStats);
router.get('/', leadController.getLeads);
router.patch('/:id', leadController.updateLead);

export default router;
