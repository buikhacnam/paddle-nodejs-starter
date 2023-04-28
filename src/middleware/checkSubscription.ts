import { Request, Response, NextFunction } from 'express'

import { AppResponse, HTTP_STATUS_UNAUTHORIZED } from '../types/Response.js'
import logger from '../log/index.js'
import { LogMetadata } from '../types/LogMetadata.js'

export const checkSubscription = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, subscription } = req.jwtPayload

	if (subscription !== 'active') {
		logger.error(email + ' has an invalid subscription', {
			user: email,
			ipAddress: req.ip,
		} as LogMetadata)
		const response: AppResponse<null> = {
			message: email + ' has an invalid subscription',
			data: null,
			statusCode: 400,
		}
		return res.status(HTTP_STATUS_UNAUTHORIZED).json(response)
	}

	console.log(email + ' has a valid subscription')
	logger.info(email + ' has a valid subscription', {
		user: email,
		ipAddress: req.ip,
	} as LogMetadata)

	return next()
}
