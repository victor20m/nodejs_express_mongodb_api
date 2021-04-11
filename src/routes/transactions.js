import { Router } from 'express';
import validateToken from '../middleware/sessionValidator.js'
import transactionsController from '../controllers/transactionsController.js';
import accountValidator from '../middleware/accountValidator.js';
const router = Router();

router.use('/', validateToken);
router.use('/', accountValidator);
router.use('/', transactionsController)
router.get('/', (req, res, next) => {
    next();
})

export default router;
