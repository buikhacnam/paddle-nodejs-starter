import { Request, Response, NextFunction } from 'express'
import fetch from 'node-fetch'
import { AppResponse } from '../../types/Response.js'


export const pricing = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const vendorId = process.env.PADDLE_VENDOR_ID
	const vendorAuthCode = process.env.PADDLE_VENDOR_AUTH_CODE
	const listPlanUrl = process.env.PADDLE_URL + '/subscription/plans'
	/*
    curl --location 'https://sandbox-vendors.paddle.com/api/2.0/subscription/plans' \
--header 'Cookie: sandbox_paddle_session_vendor=eyJpdiI6Iks4RG40VWt1cTlrZzhyb0xac2UydWc9PSIsInZhbHVlIjoieGFDcVlhSkd4MHFQRGMwZS9qT2lXSzQyOUFjRWpoYmdRN2sxN0Frc0Y0ajZjVHkrNDRQNVZVbzdGK1UvM2lNQmNQM3pQb1YrdE5nOGFaa3B1OVhZZDRRazVRSWg3cTdoaGRMRkRHZnZ0ZlFpSkhCSzZGcTZvalZON0R2eHRoUzciLCJtYWMiOiJjNjE0YmE1MWQ5OGNmZjk5YmU3NWI0OTY2ODBmMzc1Y2IzZWRlYTNmYmVkYzU4N2JmNmFlMmI1YjdhOGFlZGIyIiwidGFnIjoiIn0%3D' \
--form 'vendor_id="11321"' \
--form 'vendor_auth_code="251edff18ff8c81c2ce2b1bf214e34b1fd2a632ba0a9d025d0"'
    
    */

	const response = await fetch(listPlanUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `vendor_id=${vendorId}&vendor_auth_code=${vendorAuthCode}`,
	})

	const data: any = await response.json()

	if (data.success) {
		const response: AppResponse<any> = {
			message: 'OK',
			data: data.response,
			statusCode: 200,
		}
		return res.status(200).json(response)
	} else {
		const response: AppResponse<any> = {
			message: data.error.message,
			data: null,
			statusCode: 400,
		}
		return res.status(400).json(response)
	}
}
