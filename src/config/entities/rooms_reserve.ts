import { Entity, Column, OneToMany, JoinColumn, ManyToOne, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './rooms';
import { Reserve } from './reserves';

@Entity()
export class RoomsReserve extends BaseEntity {

    @PrimaryGeneratedColumn()
    roomsReserve_id!: number

    @Column({ type: 'int' })
    room_id!: number;

    @Column({ type: 'int' })
    reserve_id!: number;

    //   @ManyToOne(() => Room, room => room.currency_id)
    //   @JoinColumn({ name : "room_id"})
    //   rooms!: Room;

}
