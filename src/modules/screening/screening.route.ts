import { Router } from 'express';
import * as ctrl from './screening.controller';

const router = Router();

router.get('/', ctrl.getAll);

// đặt seats trước/ sau đều được, nhưng để trước cho rõ ràng
router.get('/:id/seats', ctrl.seats);

router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
