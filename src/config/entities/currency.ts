import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Room } from './rooms';

@Entity()
export class Currency {
  @PrimaryColumn()
  currency_id!: number;

  @Column({ type: 'varchar', length: 45 })
  currency_name!: string;

  @OneToMany(() => Room, room => room.currency_id)
  rooms!: Room[];
}
