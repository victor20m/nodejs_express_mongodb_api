import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
    res.send({transactions: ['test transactions list']})
})

export default router;
