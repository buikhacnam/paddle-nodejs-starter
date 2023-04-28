import { Router } from 'express'
import {download} from '../../controllers/log/download.js'
import { checkJwt } from '../../middleware/checkJwt.js'
import { checkRole } from '../../middleware/checkRole.js'

const router = Router()

router.post('/download',[checkJwt, checkRole(['ADMINISTRATOR'])], download)


export default router
