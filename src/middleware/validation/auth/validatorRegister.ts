import { Request, Response, NextFunction } from 'express'
import validator from 'validator'

export const validatorRegister = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// let { email, password, passwordConfirm } = req.body

	// email = !email ? '' : email
	// password = !password ? '' : password
	// passwordConfirm = !passwordConfirm ? '' : passwordConfirm

	// if (!validator.isEmail(email)) {
	// }

	// if (validator.isEmpty(email)) {
	// }

	// if (validator.isEmpty(password)) {
	// }

	// if (
	// 	!validator.isLength(password, {
	// 		min: 8,
	// 		max: 16,
	// 	})
	// ) {
	// }

	// if (validator.isEmpty(passwordConfirm)) {
	// }

	// if (!validator.equals(password, passwordConfirm)) {
	// }

	return next()
}
