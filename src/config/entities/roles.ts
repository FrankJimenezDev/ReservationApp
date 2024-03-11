import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { User } from './users';

@Entity()
export class UserRol {
  @PrimaryColumn()
  rolcode!: number;

  @Column({ nullable: true, type: 'varchar', length: 45 })
  rol!: string;

  @OneToMany(() => User, user => user.rolcode)
  users!: User[];
}
