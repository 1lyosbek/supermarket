import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FileEntity } from "./entities/file.entity";
import { ID } from "src/common/types/type";
import { IFileRepository } from "./interfaces/f.repository";

export class FileRepository implements IFileRepository{
    constructor(
        @InjectRepository(FileEntity)
        private fileRepository: Repository<FileEntity>,
    ){}
    async create(file: FileEntity): Promise<FileEntity> {
        return await this.fileRepository.save(file);
    }

    async createMultiliple(files: Array<FileEntity>):Promise<Array<FileEntity>>{
        const created = await this.fileRepository.save(files);
        return created
    }
    async findAll(): Promise<FileEntity[]> {
        return await this.fileRepository.find();
    }
    async findOneById(id: ID): Promise<FileEntity | undefined> {
        return await this.fileRepository.findOneBy({id});
    }
    async delete(id: ID): Promise<FileEntity | undefined> {
        const foundFile = await this.fileRepository.findOneBy({id});
        await this.fileRepository.delete(id);
        return foundFile;
    }
}