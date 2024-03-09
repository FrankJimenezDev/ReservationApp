import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Room } from './rooms';
import { User } from "./users";

//Entity to use on dbconnection for Products
@Entity()
export class Reserve extends BaseEntity {

    @PrimaryColumn({ unique: true })
    id: string = uuidv4()

    @Column({ type: "boolean", default: true })
    status!: boolean

    @Column({ type : "date"})
    createdAt: Date = new Date();

    @Column({ type : "date"})
    updatedAt: Date = new Date();

    @Column({ type : "date"})
    reserveday!: Date

    @Column({ type : "date"})
    checkin!: Date

    @Column({ type : "date"})
    checkout!: Date

    // campos de relacion
    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    user!: User;

    @OneToOne(() => Room, room => room.id)
    @JoinColumn()
    room!: Room;
}

//Entity to use on dbconnection for Products
