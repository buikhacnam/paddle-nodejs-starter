import { Request, Response, NextFunction } from 'express'
import { Role } from '../entity/users/types.js'
import { AppResponse, HTTP_STATUS_UNAUTHORIZED } from '../types/Response.js'

export const checkRole = (roles: Role[], isSelfAllowed = false) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const { id, role } = req.jwtPayload
		const { id: requestId } = req.params

		let errorSelfAllowed: string | null = null
		if (isSelfAllowed) {
			if (id === parseInt(requestId)) {
				return next()
			}
			errorSelfAllowed = 'Self allowed action.'
		}

		if (roles.indexOf(role) === -1) {
			const response: AppResponse<null> = {
				message: 'Unauthorized - Insufficient user rights',
				data: null,
				statusCode: 401,
			}

			res.status(HTTP_STATUS_UNAUTHORIZED).json(response)
		}
		return next()
	}
}
