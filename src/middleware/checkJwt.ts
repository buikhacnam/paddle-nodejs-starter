import { Response, NextFunction, Request } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types/JwtPayload.js'
import { createJwtToken } from '../utils/createJwtToken.js'
import { AppResponse, HTTP_STATUS_UNAUTHORIZED } from '../types/Response.js'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.get('Authorization')
	if (!authHeader) {
		return res
			.status(401)
			.json({ message: 'Authorization header not provided' })
	}

	const token = authHeader.split(' ')[1]
	let jwtPayload: { [key: string]: any }
	try {
		jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as {
			[key: string]: any
		}
		;['iat', 'exp'].forEach(keyToRemove => delete jwtPayload[keyToRemove])
		req.jwtPayload = jwtPayload as JwtPayload
	} catch (err) {
		const response: AppResponse<null> = {
			message: 'JWT error',
			data: null,
			statusCode: 401,
		}
		return res.status(HTTP_STATUS_UNAUTHORIZED).json(response)
	}

	try {
		// Refresh and send a new token on every request
		const newToken = createJwtToken(jwtPayload as JwtPayload)
		res.setHeader('token', `Bearer ${newToken}`)
		return next()
	} catch (err) {
		const response: AppResponse<null> = {
			message: 'Token can not be refreshed',
			data: null,
			statusCode: 401,
		}
		return res.status(HTTP_STATUS_UNAUTHORIZED).json(response)
	}
}
