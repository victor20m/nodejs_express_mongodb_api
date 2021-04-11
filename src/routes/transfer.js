import { Router } from 'express';
import transferController from '../controllers/transferController.js';
import sessionValidator from '../middleware/sessionValidator.js';
import accountValidator from '../middleware/accountValidator.js';
const router = Router();

router.use('/', sessionValidator)
router.use('/', accountValidator)
router.use('/', transferController)
router.post('/', (req, res, next) => {
    next();
})

export default router;