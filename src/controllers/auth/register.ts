import { Request, Response } from 'express'
import { EntityManager } from 'typeorm'
import { UserEntity } from '../../entity/users/UserEntity.js'
import { postgres } from '../../orm/config/ormconfig.js'
import { AppResponse, HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_OK } from '../../types/Response.js'

export const register = async (
	req: Request,
	res: Response,
) => {
	const { email, password } = req.body

	try {
		const manager: EntityManager = postgres.manager
		const userRepository = manager.getRepository(UserEntity)
		const user = await userRepository.findOne({ where: { email } })

		if (user) {
			return res.status(HTTP_STATUS_BAD_REQUEST).json({
				message: `Email '${user.email}' already exists`,
			})
			
		}

		try {
			const newUser = new UserEntity()
			newUser.email = email
			newUser.password = password
			newUser.subscription_plan_id = '0'
			newUser.hashPassword()
			newUser.active = true // TODO: change this to false and send email verification
			await userRepository.save(newUser)

			const response: AppResponse<null> = {
				message: 'Signup successfully',
				data: null,
				statusCode: 200,
			}

			return res.status(HTTP_STATUS_OK).json(response)
		} catch (err) {
			const response: AppResponse<null> = {
				message: `User '${email}' can't be created because ${err}`,
				data: null,
				statusCode: 400,
			}
			
			return res.status(HTTP_STATUS_BAD_REQUEST).json(response)
		}
	} catch (err) {
		return res.status(HTTP_STATUS_BAD_REQUEST).json({
			message: `Sign up failed because ${err}`,
			data: null,
			statusCode: 400,
		} as AppResponse<null>)
	}
}
