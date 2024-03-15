import { ID } from "src/common/types/type";
import { FileEntity } from "../entities/file.entity";

export interface IFileRepository{
    findOneById(id: ID): Promise<FileEntity>;
    findAll(): Promise<FileEntity[]>;
    create(file: FileEntity): Promise<FileEntity>;
    delete(id: ID): Promise<FileEntity>;
    createMultiliple(files: Array<FileEntity>): Promise<FileEntity[]>
}