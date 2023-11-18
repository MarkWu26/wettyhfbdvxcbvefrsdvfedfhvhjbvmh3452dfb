import express from 'express';
const router = express.Router();

import { addMetric, getSavedmetrics, getAllMetrics } from '../controllers/userController.js';

router.get('/savedMetrics', getSavedmetrics);
router.post('/addMetric', addMetric)
router.get('/getAllMetrics', getAllMetrics)


export default router