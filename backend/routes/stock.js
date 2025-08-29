import express from 'express';
import { getStockIndicators, getTop500 } from '../controllers/stockController.js';

const router = express.Router();

router.get('/top500', getTop500);
router.get('/:symbol/indicators', getStockIndicators);

export default router;
