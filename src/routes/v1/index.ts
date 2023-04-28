import { Router } from 'express'
import auth from './auth.js'

import users from './users.js'
import paddle from './paddle.js'
import subscription from './subscription.js'
import log from './log.js'

const router = Router()


router.use('/users', users)
router.use('/auth', auth)
router.use('/paddle', paddle)
router.use('/subscription', subscription)
router.use('/log', log)


export default router
