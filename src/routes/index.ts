import { Router } from 'express'

import v1 from './v1/index.js'

const router = Router()

router.get(`/`, (req, res) => {
	res.send(`Hi!`)
})

router.use(`/v1`, v1)

export default router
