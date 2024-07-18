import { Router } from 'express';
import { SourceController } from '../controllers/SourceController';

const router = Router();
const sourceController = new SourceController();

router.post('/sources', (req, res) => sourceController.createSource(req, res));
router.put('/sources/:id', (req, res) => sourceController.updateSource(req, res));
router.delete('/sources/:id', (req, res) => sourceController.deleteSource(req, res));
router.get('/sources', (req, res) => sourceController.getAllSources(req, res));
router.get('/sources/:id', (req, res) => sourceController.getSourceById(req, res));

export default router;
