import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { User } from './users';

@Entity()
export class Roles {
  @PrimaryColumn()
  role_id!: number;

  @Column({ nullable: true, type: 'varchar', length: 45 })
  role_name!: string;

  // @OneToMany(() => User, user => user.rol_id)
  // users!: User[];
}
