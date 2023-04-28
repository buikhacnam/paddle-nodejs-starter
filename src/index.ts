import 'dotenv/config'
import 'reflect-metadata'
import cron from 'node-cron'

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import { errorHandler } from './middleware/errorHandler.js'
import { dbCreateConnection } from './orm/dbCreateConnection.js'
import routes from './routes/index.js'
import { EntityManager } from 'typeorm'
import { postgres } from './orm/config/ormconfig.js'
import { UserEntity } from './entity/users/UserEntity.js'

export const app = express()
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes)

cron.schedule('0 0 * * *', async () => {
	const manager: EntityManager = postgres.manager

	console.log('reset daily limit at 12:00 am every day')

	//reset daily limit of all users
	await manager
		.createQueryBuilder()
		.update(UserEntity)
		.set({
			daily_limit: 0,
		})
		.where('active = :active', { active: true })
		.execute()

	console.log('daily limit reset done!')
})

app.use(errorHandler)

const port = process.env.PORT || 4000
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
;(async () => {
	await dbCreateConnection()
})()
