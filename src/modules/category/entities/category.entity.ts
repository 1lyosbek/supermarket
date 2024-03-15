import { BaseEntity } from 'src/common/database/base.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column({name : "name", type: "varchar", unique: true, nullable: true})
  name: string;

  @OneToMany(()=> ProductEntity, (product)=> product.category)
  products: Array<ProductEntity>;
}
