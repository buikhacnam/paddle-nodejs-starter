import { Router } from 'express'
import { webhook } from '../../controllers/paddle/webhook/index.js'
import { pricing } from '../../controllers/paddle/pricing.js'
import { checkJwt } from '../../middleware/checkJwt.js'
import { checkSubscription } from '../../middleware/checkSubscription.js'
import { subscriptionCancel } from '../../controllers/paddle/cancel.js'
import { subscriptionUpdate } from '../../controllers/paddle/update.js'


const router = Router()

router.post('/webhook', webhook)

router.get('/pricing', pricing)

router.post('/update', [checkJwt, checkSubscription], subscriptionUpdate)

router.post('/cancel', [checkJwt, checkSubscription], subscriptionCancel)

export default router
