import { ResData } from "src/lib/resData";
import { FileEntity } from "../entities/file.entity";
import { ID } from "src/common/types/type";
import { CreateFileDto } from "../dto/create-file.dto";

export interface IFileService {
 findAll():Promise<ResData<FileEntity[]>>;
 findOne(id: ID): Promise<ResData<FileEntity>>;
 create(file: Express.Multer.File, createFileDto: CreateFileDto):Promise<ResData<FileEntity>>;
 createMultiple(file: Array<Express.Multer.File>): Promise<ResData<FileEntity[]>>;
 remove(id: ID): Promise<ResData<FileEntity>>;
}