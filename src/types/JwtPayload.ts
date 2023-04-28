import { Role } from '../entity/users/types.js'

export type JwtPayload = {
	email: string
	role: Role
	subscription?: string
	subscription_plan_id?: string
	subscription_id?: string
	id?: number
}
