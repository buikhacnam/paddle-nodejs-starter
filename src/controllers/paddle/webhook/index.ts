import { Request, Response, NextFunction } from 'express'
import { EntityManager } from 'typeorm'
import { UserEntity } from '../../../entity/users/UserEntity.js'
import { postgres } from '../../../orm/config/ormconfig.js'
import { AppResponse } from '../../../types/Response.js'

export const webhook = async (
	req: Request,
	res: Response,
) => {
	const body = req.body
	const now = new Date()
	console.log('paddle webhook at: ', now)
	console.log('paddle webhook body: ', body)
	const alert_name = body?.alert_name
	const email = body?.email
	const status = body?.status

	const manager: EntityManager = postgres.manager
	const userRepository = manager.getRepository(UserEntity)
	const user = await userRepository.findOne({ where: { email } })

	if (!user) {
		console.log('Paddle Webhook: user not found:' + email)
		return res.status(200).json({ message: 'user not found ' + email })
	}

	if (alert_name === 'subscription_created') {
		user.subscription = status
		user.next_bill_date = body?.next_bill_date
		user.subscription_id = body?.subscription_id
		user.subscription_plan_id = body?.subscription_plan_id
		user.user_id = body?.user_id
		if (user.subscription === 'trial') user.daily_limit = 0
		await userRepository.save(user)
		console.log(email + ' has created a subscription')
	}

	if (alert_name === 'subscription_payment_succeeded') {
		user.subscription = status
		user.next_bill_date = body?.next_bill_date
		user.subscription_id = body?.subscription_id
		user.subscription_plan_id = body?.subscription_plan_id
		user.user_id = body?.user_id
		user.subscription_payment_id = body?.subscription_payment_id
		if (user.subscription === 'trial') user.daily_limit = 0
		await userRepository.save(user)
		console.log(email + ' has paid a subscription')
	}

	if (alert_name === 'subscription_cancelled') {
		// check if the user has subscription id that matches the cancelled subscription
		if (user.subscription_id !== body?.subscription_id) {
			console.log(
				'subscription_cancelled: user.subscription_id !== body?.subscription_id'
			)
			return res.status(200).json({ message: 'OK', data: null })
		}

		user.subscription = status
		user.next_bill_date = body?.next_bill_date
		user.subscription_id = body?.subscription_id
		user.subscription_plan_id = body?.subscription_plan_id
		user.user_id = body?.user_id
		await userRepository.save(user)
		console.log(email + ' has cancelled a subscription')
	}

	if (alert_name === 'subscription_updated') {
		user.subscription = status
		user.next_bill_date = body?.next_bill_date
		user.subscription_id = body?.subscription_id
		user.subscription_plan_id = body?.subscription_plan_id
		user.user_id = body?.user_id
		if (user.subscription === 'trial') user.daily_limit = 0
		await userRepository.save(user)
		console.log(email + ' has updated a subscription')
	}

	if (alert_name === 'subscription_payment_failed') {
		user.subscription = status
		user.next_bill_date = body?.next_bill_date
		user.subscription_id = body?.subscription_id
		user.subscription_plan_id = body?.subscription_plan_id
		user.user_id = body?.user_id
		await userRepository.save(user)
		console.log(email + ' has failed a subscription')
	}

	const response: AppResponse<null> = {
		message: 'OK',
		data: null,
		statusCode: 200,
	}

	return res.status(200).json(response)
}
