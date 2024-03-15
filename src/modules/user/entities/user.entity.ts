import { BaseEntity } from 'src/common/database/base.entity';
import { RoleEnum } from 'src/common/enums/enum';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ name: 'full_name', type: 'varchar', length: 256, nullable: true })
  fullName: string;

  @Column({ type: 'varchar', length: 36, unique: true, nullable: false })
  login: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'text', nullable: false })
  role: RoleEnum;

  @OneToMany(
    () => TransactionEntity,
    (transactionEntity) => transactionEntity.user,
  )
  transactions: Array<TransactionEntity>;
}
