// src/modules/movie/movie.route.ts
import { Router, RequestHandler } from 'express';
import * as movieController from './movie.controller';
import { isValidObjectId } from 'mongoose';

const router = Router();

const validateObjectId: RequestHandler = (req, res, next): void => {
  const { id } = req.params;
  if (id && !isValidObjectId(id)) {
    res.status(400).json({ success: false, message: 'Invalid movie id' });
    return; // <-- trả về void, không return Response
  }
  next();
};

router.get('/', movieController.getAll);                 // GET /api/v1/movies?status=now_showing
router.get('/:id', validateObjectId, movieController.getById);
router.post('/', movieController.create);
router.put('/:id', validateObjectId, movieController.update);
router.delete('/:id', validateObjectId, movieController.remove);

export default router;
