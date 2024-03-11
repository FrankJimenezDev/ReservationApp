import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { User } from './users';

@Entity()
export class UserRol {
  @PrimaryColumn()
  id!: number;

  @Column({ nullable: true, type: 'varchar', length: 45 })
  rol!: string;

  @OneToMany(() => User, user => user.rol)
  users!: User[];
}
