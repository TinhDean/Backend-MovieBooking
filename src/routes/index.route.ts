// src/routes/index.route.ts
import { Router } from 'express'

//auth route
import authRoutes from '@modules/auth/auth.route'

//user route
import userRoutes from '@modules/user/user.route'

//role route
import roleRoutes from '@modules/role/role.route'

//permission route
import permissionRoutes from '@modules/permission/permission.route'

//upload route
import uploadRoutes from '@modules/upload/upload.route'

import movieRoutes from '@modules/movie/movie.route';

import roomRoutes from '@modules/room/room.route';

import screeningRoutes from '@modules/screening/screening.route';

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/roles', roleRoutes)
router.use('/permissions', permissionRoutes)
router.use('/uploads', uploadRoutes)
router.use('/movies', movieRoutes)
router.use('/rooms', roomRoutes)
router.use('/screenings', screeningRoutes)

export default router
