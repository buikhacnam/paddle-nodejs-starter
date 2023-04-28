import { Request, Response, NextFunction } from 'express'
import { EntityManager } from 'typeorm'
import { UserEntity } from '../../entity/users/UserEntity.js'
import { postgres } from '../../orm/config/ormconfig.js'


export const subscription = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {


    res.status(200).json({message: 'OK', data: "hello subscriber!"})

}