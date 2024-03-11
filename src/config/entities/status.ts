import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { User } from './users';
import { Room } from './rooms';
import { Reserve } from './reserves';

@Entity()
export class ReserveStatus {
  @PrimaryColumn()
  id!: number;

  @Column({ nullable: false, type: 'varchar', length: 45 })
  status!: string;

  @OneToMany(() => Reserve, reserve => reserve.status)
  Reserves!: Reserve[];
}

@Entity()
export class RoomStatus {
  @PrimaryColumn()
  id!: number;

  @Column({ nullable: false, type: 'varchar', length: 45 })
  status!: string;

  @OneToMany(() => Room, room => room.status)
  rooms!: Room[];
}

@Entity()
export class UserStatus {
  @PrimaryColumn()
  id!: number;

  @Column({ nullable: false, type: 'varchar', length: 45 })
  status!: string;

  @OneToMany(() => User, user => user.status)
  users!: User[];
}

