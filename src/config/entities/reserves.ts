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

    // campos de relacion
    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    userid!: User;

    @OneToOne(() => Room, room => room.id)
    @JoinColumn()
    roomid!: Room;
}

//Entity to use on dbconnection for Products
