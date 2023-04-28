import { Request, Response } from 'express'
import { EntityManager } from 'typeorm'

import { Role, AccountType } from '../../entity/users/types.js'
import { UserEntity } from '../../entity/users/UserEntity.js'
import { postgres } from '../../orm/config/ormconfig.js'
import { JwtPayload } from '../../types/JwtPayload.js'
import { createJwtToken } from '../../utils/createJwtToken.js'
import {
	AppResponse,
	HTTP_STATUS_BAD_REQUEST,
	HTTP_STATUS_OK,
} from '../../types/Response.js'
import logger from '../../log/index.js'
import { LogMetadata } from '../../types/LogMetadata.js'
import { OAuth2Client } from 'google-auth-library'

export const googleLogin = async (
	req: Request,
	res: Response
) => {

	try {
		console.log('someone is trying to login via google')
		const { clientId, credential } = req.body

		const client = new OAuth2Client(clientId);
		// Call the verifyIdToken to
		// varify and decode it
		const ticket = await client.verifyIdToken({
			idToken: credential,
			audience: clientId,
		});
		// Get the JSON with all the user info
		const data:any = ticket.getPayload();

		const email = data?.email
		const given_name = data?.given_name
		const family_name = data?.family_name
		const picture = data?.picture

		const manager: EntityManager = postgres.manager
		const userRepository = manager.getRepository(UserEntity)

		const user = await userRepository.findOne({
			where: { email },
		})

		if (!user) {
			// create new user
			const newUser = new UserEntity()
			const now = new Date()
			const threeDayLater = new Date(
				now.getTime() + 3 * 24 * 60 * 60 * 1000
			)
			newUser.email = email
			newUser.account_type = 'GOOGLE' as AccountType
			newUser.first_name = given_name
			newUser.last_name = family_name
			newUser.picture = picture
			newUser.active = true
			newUser.next_bill_date = threeDayLater
			newUser.subscription_plan_id = '0'

			const userSave = await userRepository.save(newUser)

			const jwtPayload: JwtPayload = {
				email: userSave.email,
				role: userSave.role as Role,
				subscription: userSave.subscription,
				subscription_plan_id: userSave.subscription_plan_id,
				subscription_id: userSave.subscription_id,
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
				console.log('err' + err)

				logger.error('Google Login 3', {
					user: email,
					ipAddress: req.ip,
					error: err,
				} as LogMetadata)

				const response: AppResponse<null> = {
					message: "Token can't be created",
					data: null,
					statusCode: 400,
				}

				return res.status(HTTP_STATUS_BAD_REQUEST).json(response)
			}
		} else {
			//check if user is active
			if (!user.active) {
				logger.error('Google Login 4', {
					user: email,
					ipAddress: req.ip,
					error: 'User is not active',
				} as LogMetadata)

				const response: AppResponse<null> = {
					message: 'User is not active',
					data: null,
					statusCode: 400,
				}

				return res.status(HTTP_STATUS_BAD_REQUEST).json(response)
			}

			if (user.account_type !== 'GOOGLE') {
				logger.error('Google Login 5', {
					user: email,
					ipAddress: req.ip,
					error: 'User is not a google user',
				} as LogMetadata)

				const response: AppResponse<null> = {
					message: 'User is not a google user',
					data: null,
					statusCode: 400,
				}

				return res.status(HTTP_STATUS_BAD_REQUEST).json(response)
			}

			// login user
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
				console.log('err0' + err)
				logger.error('Google Login 1', {
					user: email,
					ipAddress: req.ip,
					error: err,
				} as LogMetadata)

				const response: AppResponse<null> = {
					message: "Token can't be created",
					data: null,
					statusCode: 400,
				}

				return res.status(HTTP_STATUS_BAD_REQUEST).json(response)
			}
		}
	} catch (err) {
		const response: AppResponse<null> = {
			message: 'Error',
			data: null,
			statusCode: 400,
		}
		console.log('err1' + err)
		logger.error('Google Login 2', {
			user: 'googleLogin',
			ipAddress: req.ip,
			error: err,
		} as LogMetadata)
		return res.status(HTTP_STATUS_BAD_REQUEST).json(response)
	}
}
