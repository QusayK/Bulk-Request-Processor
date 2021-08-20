import express from 'express';

import { processRequests, getRequests } from '../controllers/requests';

const router = express.Router();

router.post('/process', processRequests);
router.get('/all', getRequests);

export default router;