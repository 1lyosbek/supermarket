import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileRepository } from './file.repository';
import { FileEntity } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FileEntity,
    ])],
  controllers: [FileController],
  providers: [
   {provide: "IFileService", useClass: FileService},
   {provide: "IFileRepository", useClass: FileRepository}
  ],
})
export class FileModule {}
