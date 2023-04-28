import { Request, Response, NextFunction } from 'express'
import fetch from 'node-fetch'
import { AppResponse } from '../../types/Response.js'


export const subscriptionUpdate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// get subscription_id from the request jwt header
	const { subscription_id, email } = req.jwtPayload
	const { plan_id } = req.body
	const vender_id = process.env.PADDLE_VENDOR_ID
	const vender_auth_code = process.env.PADDLE_VENDOR_AUTH_CODE
	const paddle_url = process.env.PADDLE_URL

	console.log({
		action: 'subscriptionUpdate from user: ' + email,
		subscription_id,
		plan_id,
		vender_id,
		vender_auth_code,
	})

	try {
		const response = await fetch(
			`${paddle_url}/subscription/users/update`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `vendor_id=${vender_id}&vendor_auth_code=${vender_auth_code}&subscription_id=${subscription_id}&plan_id=${plan_id}`,
			}
		)

		const data = await response.json()
		console.log(data)

		const responseObj: AppResponse<any> = {
			message: 'OK',
			data: data,
			statusCode: 200,
		}
		
		return res.status(200).json(responseObj)
	} catch (error) {
		console.log(error)
		const responseObj: AppResponse<any> = {
			message: 'Subscription cant be updated',
			data: null,
			statusCode: 200,
		}
		return res.status(400).json(responseObj)
	}
}
