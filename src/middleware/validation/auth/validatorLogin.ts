import { Request, Response, NextFunction } from 'express'
import validator from 'validator'

export const validatorLogin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// let { email, password } = req.body

	// email = !email ? '' : email
	// password = !password ? '' : password

	// if (!validator.isEmail(email)) {
	// }

	// if (validator.isEmpty(email)) {
	// }

	// if (validator.isEmpty(password)) {
	// }

	return next()
}
