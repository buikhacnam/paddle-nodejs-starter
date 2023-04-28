import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { DataSource } from 'typeorm/data-source/DataSource.js'
import { UserEntity } from '../../entity/users/UserEntity.js'

export const postgres = new DataSource({
	type: 'postgres',
	name: 'default',
	host: process.env.PG_HOST,
	port: Number(process.env.PG_PORT),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	synchronize: true,
	logging: false,
	entities: [UserEntity],
	namingStrategy: new SnakeNamingStrategy(),
})
