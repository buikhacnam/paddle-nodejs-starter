import { postgres } from './config/ormconfig.js'

export const dbCreateConnection = async () => {
	try {
		const conn = await postgres.initialize()
		console.log('Database connection established')
		console.log('Hi mom! 3')
	} catch (error) {
		console.error(error)
	}
}
