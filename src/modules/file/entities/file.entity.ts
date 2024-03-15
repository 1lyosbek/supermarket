import { BaseEntity } from 'src/common/database/base.entity';
import { Entity, Column } from 'typeorm';

@Entity("files")
export class FileEntity extends BaseEntity {
  @Column({name : "location", type: "text", nullable: false})
  location: string;

  @Column({type: "varchar", nullable: true})
  name: string;

  @Column({name: "mime_type", type: "varchar", nullable: false})
  mimetype: string;

  @Column({type: "int", nullable: false})
  size: number;
}

