import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { User } from "./users";
import { Status } from "./status";
import { RoomsReserve } from "./rooms_reserve";

//Entity to use on dbconnection for Products
@Entity()
export class Reserve extends BaseEntity {

    @PrimaryColumn({ unique: true })
    reserve_id: string = uuidv4()

    @Column({ type: "int", default: 1 })
    status_id!: number

    @Column({type: "varchar", length: "255"})
    user_id!: string

    @CreateDateColumn()
    createdAt: Date = new Date();

    @UpdateDateColumn()
    updatedAt: Date = new Date();

    @Column({ type: "date", nullable: true})
    reserveday!: Date

    @Column({ type: "date", nullable: true})
    checkin?: Date

    @Column({ type: "date", nullable: true})
    checkout?: Date

    // campos de relacion
    @ManyToOne(() => User, user => user.user_id)
    @JoinColumn({ name: "user_id"})
    userid!: User;

    @OneToMany(() => RoomsReserve, reserve => reserve.reserve_id)
    reserveRoom!: Reserve[];

    @ManyToOne(() => Status, status => status.status_id)
    @JoinColumn({ name: "status_id"})
    reserveStatus!: Status;
}

//Entity to use on dbconnection for Products
