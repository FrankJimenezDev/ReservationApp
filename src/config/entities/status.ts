import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { User } from './users';
import { Room } from './rooms';
import { Reserve } from './reserves';

@Entity()
export class Status {
  @PrimaryColumn()
  status_id!: number;

  @Column({ nullable: false, type: 'varchar', length: 45 })
  status_name!: string;

  // @OneToMany(() => Reserve, reserve => reserve.status_id)
  // Reserves!: Reserve[];

  // @OneToMany(() => User, user => user.status_id)
  // Users!: User[];

  // @OneToMany(() => Room, room => room.status_id)
  // Rooms!: Room[];
}

