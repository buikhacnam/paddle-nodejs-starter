import { Request, Response, NextFunction } from 'express'

import fs from 'fs'
import path from 'path'

const logDirectory = './logs'
const logFilenamePrefix = 'application-'

export const download = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		const dateString = req.body.dateString
		const logFilePath = path.join(
			logDirectory,
			logFilenamePrefix + dateString + '.log'
		)

		if (!fs.existsSync(logFilePath)) {
			return res
				.status(404)
				.send('Log file not found for specified date.')
		}

		const logContents = fs.readFileSync(logFilePath, 'utf8')

		res.setHeader(
			'Content-Disposition',
			`attachment; filename="${dateString}-log.txt"`
		)
		res.setHeader('Content-Type', 'text/plain')
		return res.send(logContents)
	} catch (error) {
		console.log(error)
		return res.status(500).send('Something went wrong')
	}
}
