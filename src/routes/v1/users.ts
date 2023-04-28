import { Router } from 'express'
import { list } from '../../controllers/users/list.js'
import { checkJwt } from '../../middleware/checkJwt.js'
import { checkRole } from '../../middleware/checkRole.js'
import logger from '../../log/index.js'
import { LogMetadata } from '../../types/LogMetadata.js'
import { userInactive } from '../../controllers/users/inactive.js'

const router = Router()

router.get('/', [checkJwt, checkRole(['ADMINISTRATOR'])], list)

router.get('/inactive', [checkJwt], userInactive)

router.get('/test', (req, res) => {
	logger.info('info logger', {
		user: 'buinam11@gmail.com',
		ipAddress: '192.168.0.1',
		test: 'test',
	} as LogMetadata)

	logger.error('error logger', {
		user: 'buinam11@gmail.com',
		ipAddress: '192.168.0.1',
		test: 'test',
	} as LogMetadata)
	res.send('test')
})

export default router
