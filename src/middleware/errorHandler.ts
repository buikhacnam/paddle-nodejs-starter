import { Request, Response, NextFunction } from 'express'
import logger from '../log/index.js'
import {
	AppResponse,
	HTTP_STATUS_INTERNAL_SERVER_ERROR,
} from '../types/Response.js'

export const errorHandler = (err: Error, req: Request, res: Response) => {
	logger.error(`Unhandled exception: ${err.message}`, {
		stack: err.stack,
		ipAddress: req.ip,
	})

	const response: AppResponse<null> = {
		message: 'Internal Server Error',
		data: null,
		statusCode: 500,
	}

	res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json(response)
}
