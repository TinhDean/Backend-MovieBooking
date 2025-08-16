import { Router } from 'express';
import * as ctrl from './room.controller';
// import { validate } from '@middlewares';
// import { createRoomSchema, updateRoomSchema } from './room.validator'; // nếu bạn muốn bật validate sau

const router = Router();

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);                 // có thể thêm validate(createRoomSchema)
router.put('/:id', ctrl.update);               // validate(updateRoomSchema)
router.delete('/:id', ctrl.remove);

// API cập nhật sơ đồ ghế của phòng
router.put('/:id/seatmap', ctrl.upsertSeatMap);

export default router;
