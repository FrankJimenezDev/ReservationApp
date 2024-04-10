import { Entity, Column, OneToMany, JoinColumn, ManyToOne, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { Reserve } from './reserves';
import { Room } from './rooms';

@Entity()
export class RoomsReserve extends BaseEntity {

    @PrimaryGeneratedColumn()
    roomsReserve_id!: number

    @Column({ type: 'int' })
    room_id!: number;

    @Column({ type: 'int' })
    reserve_id!: string;

    @ManyToOne(() => Reserve, reserve => reserve.reserveRoom)
    @JoinColumn({ name: "reserve_id" })
    reserve!: Reserve;

    @ManyToOne(() => Room, room => room.roomReserve)
    @JoinColumn({ name: "room_id" })
    room!: Room;

}
