import { Request, Response, NextFunction } from 'express';
import { EntityManager } from 'typeorm'
import { postgres } from '../../orm/config/ormconfig.js'
import { UserEntity } from '../../entity/users/UserEntity.js'
import { AppResponse } from '../../types/Response.js';

export const userInactive = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		// get email from the request jwt header
		const { email } = req.jwtPayload

		const manager: EntityManager = postgres.manager

		// set user to inactive
		await manager
			.createQueryBuilder()
			.update(UserEntity)
			.set({
				active: false,
			})
			.where('email = :email', { email: email })
			.execute()

		const response: AppResponse<any> = {
			message: 'OK',
			data: null,
			statusCode: 200,
		}

		return res.status(200).json(response)
	} catch (error) {

		console.log(error)
		const response: AppResponse<any> = {
			message: 'User deactivation failed.',
			data: null,
			statusCode: 400,
		}
        return res.status(400).json(response)
	}
}
