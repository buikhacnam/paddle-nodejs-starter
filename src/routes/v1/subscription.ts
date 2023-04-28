import { Router } from 'express'
import { subscription } from '../../controllers/subscription/index.js'
import { checkJwt } from '../../middleware/checkJwt.js'
import { checkSubscription } from '../../middleware/checkSubscription.js'

const router = Router()

router.get('/', [checkJwt, checkSubscription], subscription)

export default router
