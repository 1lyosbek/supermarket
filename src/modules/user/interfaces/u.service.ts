import { ID } from "src/common/types/type";
import { UserEntity } from "../entities/user.entity";
import { ResData } from "src/lib/resData";

export interface IUserService{
    findAll(): Promise<ResData<UserEntity[]>>;
    findOneById(id: ID): Promise<ResData<UserEntity>>;
    findOneByLogin(login: string): Promise<ResData<UserEntity | undefined>>;
}