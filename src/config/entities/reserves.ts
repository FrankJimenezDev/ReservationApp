import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Room } from './rooms';
import { User } from "./users";
import { ReserveStatus } from "./status";

//Entity to use on dbconnection for Products
@Entity()
export class Reserve extends BaseEntity {

    @PrimaryColumn({ unique: true })
    id: string = uuidv4()

    @Column({ type: "int", default: 1 })
    status!: number

    @CreateDateColumn()
    createdAt: Date = new Date();

    @UpdateDateColumn()
    updatedAt: Date = new Date();

    @Column({ type: "date", nullable: true})
    reserveday!: Date

    @Column({ type: "date", nullable: true})
    checkin!: Date

    @Column({ type: "date", nullable: true})
    checkout!: Date

    // @Column({type: "int"})
    // room!: number

    // @Column({type : "varchar", length: 45})
    // user!: string

    // campos de relacion
    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    userid!: User;

    @OneToOne(() => Room, room => room.id)
    @JoinColumn()
    roomid!: Room;

    @ManyToOne(() => ReserveStatus, status => status.id)
    @JoinColumn()
    reserveStatus!: ReserveStatus;
}

//Entity to use on dbconnection for Products
