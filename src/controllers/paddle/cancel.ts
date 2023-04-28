import { Request, Response, NextFunction } from 'express'
import fetch from 'node-fetch'
import { AppResponse } from '../../types/Response.js'

/*
curl --location 'https://sandbox-vendors.paddle.com/api/2.0/subscription/users_cancel' \
--form 'vendor_id="11321"' \
--form 'vendor_auth_code="251edff18ff8c81c2ce2b1bf214e34b1fd2a632ba0a9d025d0"' \
--form 'subscription_id="445583"'

*/
export const subscriptionCancel = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {

    // get subscription_id from the request jwt header
    const { subscription_id, email } = req.jwtPayload
    const vender_id = process.env.PADDLE_VENDOR_ID
    const vender_auth_code = process.env.PADDLE_VENDOR_AUTH_CODE
    const paddle_url = process.env.PADDLE_URL

    console.log({
        action: 'subscriptionCancel from user: ' + email,
        subscription_id,
        vender_id,
        vender_auth_code
    })

    try {

        const response = await fetch(`${paddle_url}/subscription/users_cancel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `vendor_id=${vender_id}&vendor_auth_code=${vender_auth_code}&subscription_id=${subscription_id}`
        })

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
			message: 'Subscription cant be cancelled',
			data: null,
			statusCode: 200,
		}
        return res.status(200).json(responseObj)
    }


    

}