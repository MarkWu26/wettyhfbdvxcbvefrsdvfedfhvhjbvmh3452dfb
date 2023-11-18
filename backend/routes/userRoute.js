import express from 'express';
const router = express.Router();

import { addMetric, getSavedmetrics, getAllMetrics, deleteMetric } from '../controllers/userController.js';

router.get('/savedMetrics', getSavedmetrics);
router.post('/addMetric', addMetric)
router.get('/getAllMetrics', getAllMetrics)
router.delete('/deleteMetric/:id', deleteMetric)


export default router