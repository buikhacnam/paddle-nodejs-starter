import { Request, Response, NextFunction } from 'express'
import { EntityManager } from 'typeorm'

import { Role } from '../../entity/users/types.js'
import { UserEntity } from '../../entity/users/UserEntity.js'
import { postgres } from '../../orm/config/ormconfig.js'
import { JwtPayload } from '../../types/JwtPayload.js'
import { createJwtToken } from '../../utils/createJwtToken.js'
import { AppResponse, HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_OK } from '../../types/Response.js'

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body

	try {
		console.log(email + ' is trying to login')
		const manager: EntityManager = postgres.manager
		const userRepository = manager.getRepository(UserEntity)
		const user = await userRepository.findOne({
			where: {
				email,
				account_type: 'CUSTOM',
				active: true,
			},
		})

		if (!user) {
			return res.status(HTTP_STATUS_BAD_REQUEST).json({
				message: 'Incorrect email or password',
				data: null,
				statusCode: 400,
			} as AppResponse<null>)
			
		}

		if (!user.checkIfPasswordMatch(password)) {
			return res.status(HTTP_STATUS_BAD_REQUEST).json({
				message: 'Incorrect email or password',
				data: null,
				statusCode: 400,
			} as AppResponse<null>)
			
		}

		const jwtPayload: JwtPayload = {
			email: user.email,
			role: user.role as Role,
			subscription: user.subscription,
			subscription_plan_id: user.subscription_plan_id,
			subscription_id: user.subscription_id,
		}

		try {
			const token = createJwtToken(jwtPayload)
			const response: AppResponse<string> = {
				message: 'Token successfully created.',
				data: `Bearer ${token}`,
				statusCode: 200,
			}

			return res.status(HTTP_STATUS_OK).json(response)
		} catch (err) {
			const response: AppResponse<null> = {
				message: "Token can't be created",
				data: null,
				statusCode: 400,
			}

			return res.status(400).json(response)
		}
	} catch (err) {
		const response: AppResponse<null> = {
			message: "Token can't be created",
			data: null,
			statusCode: 400,
		}

		return res.status(400).json(response)
	}
}
