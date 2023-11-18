import express from 'express';
const router = express.Router();
import { getMetricNames, getMetrics } from '../controllers/metricsController.js';

router.get('/', getMetrics);
router.get('/metricNames', getMetricNames)

export default router