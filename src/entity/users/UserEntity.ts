import bcrypt from 'bcryptjs'
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'
import { AccountType, Role } from './types.js'

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		unique: true,
	})
	email: string

	@Column({ nullable: true })
	password: string

	@Column({ nullable: true })
	first_name: string

	@Column({ nullable: true })
	last_name: string

	@Column({ default: false })
	active: boolean

	@Column({
		default: 'STANDARD' as Role,
		length: 30,
	})
	role: string

	@Column({
		default: 'CUSTOM' as AccountType,
		length: 30,
	})
	account_type: string

	@Column()
	@CreateDateColumn()
	created_at: Date

	@Column()
	@UpdateDateColumn()
	updated_at: Date

	//subscription
	@Column({ default: 'trial' })
	subscription: string

	@Column({ nullable: true })
	subscription_id: string

	@Column({ nullable: true })
	subscription_plan_id: string

	@Column({ nullable: true })
	subscription_payment_id: string

	@Column({ nullable: true })
	next_bill_date: Date

	@Column({ nullable: true })
	user_id: number

	@Column({ nullable: true })
	picture: string

	@Column({ default: 0 })
	daily_limit: number

	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 8)
	}

	checkIfPasswordMatch(unencryptedPassword: string) {
		return bcrypt.compareSync(unencryptedPassword, this.password)
	}
}
