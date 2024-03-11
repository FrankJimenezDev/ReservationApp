import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { User } from './users';

@Entity()
export class ReserveStatus {
  @PrimaryColumn()
  number!: number;

  @Column({ nullable: false, type: 'varchar', length: 45 })
  status!: string;
}

@Entity()
export class RoomStatus {
  @PrimaryColumn()
  number!: number;

  @Column({ nullable: false, type: 'varchar', length: 45 })
  status!: string;
}

@Entity()
export class UserStatus {
  @PrimaryColumn()
  number!: number;

  @Column({ nullable: false, type: 'varchar', length: 45 })
  status!: string;

  @OneToMany(() => User, user => user.status)
  users!: User[];
}

