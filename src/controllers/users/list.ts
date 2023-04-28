import { Request, Response, NextFunction } from 'express';
import { EntityManager } from 'typeorm';
import { UserEntity } from '../../entity/users/UserEntity.js';
import { postgres } from '../../orm/config/ormconfig.js';


export const list = async (req: Request, res: Response, next: NextFunction) => {
    const manager: EntityManager = postgres.manager;
    const userRepository = manager.getRepository(UserEntity);
  try {
    const users = await userRepository.find({
      select: ['id', 'first_name', 'last_name', 'email', 'role', 'created_at', 'updated_at'],
    });
    res.status(200).json({message: 'List of users.', users})
  } catch (err) {
    res.status(400).json({message: `Can't retrieve list of users.`})
  }
};
