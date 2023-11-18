import express from 'express';
const router = express.Router();
import { getExecutiveSummary } from '../controllers/reportsController.js';

router.get('/getMetrics', getExecutiveSummary);
/* router.get('/metricNames', getMetricNames) */

export default router