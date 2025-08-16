import { Router } from 'express';
import * as controller from './auth.controller';
import { requireAuth, validate, createAuditLog } from '@middlewares';
import { LoginSchema, RegisterSchema } from './dtos';
import { ChangePasswordSchema } from './dtos';           // <-- thêm
import { LogAction } from '@shared/enums';   

const router = Router();

router.post('/login', validate(LoginSchema), controller.login);
router.post('/register', validate(RegisterSchema), controller.register);
router.post('/refresh-token', controller.refreshToken);
router.get('/me', requireAuth, controller.getMe);
router.post('/logout', controller.logout);
router.put(
  '/change-password',
  // requireAuth,
  validate(ChangePasswordSchema),
  createAuditLog({
    action: LogAction.UPDATE_PROFILE,
    targetModel: 'User',
    targetId: (req) => req.user!._id,
    description: (req) => `User ${req.user!.email} changed their password`,
  }),
  controller.changePassword
);

export default router;
