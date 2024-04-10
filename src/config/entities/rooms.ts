import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Reserve } from "./reserves";
import { Status } from "./status";
import { Currency } from "./currency";
import { RoomsReserve } from "./rooms_reserve";

//Entity to use on dbconnection for Products
@Entity()
export class Room extends BaseEntity {

    @PrimaryColumn({ unique: true })
    room_id!: string

    @Column()
    size!: string

    @Column({ type: "int", default: 0 })
    status_id!: number

    @Column()
    price!: number

    @Column({ type: "int" })
    currency_id!: number

    @CreateDateColumn()
    createdAt: Date = new Date()

    @UpdateDateColumn()
    updatedAt: Date = new Date()

    // campos de relacion

    @OneToMany(() => RoomsReserve, roomReserve => roomReserve.room)
    roomReserve!: RoomsReserve[];

    @ManyToOne(() => Status, status => status.status_id)
    @JoinColumn({ name: "status_id" })
    roomStatus!: Status;

    @ManyToOne(() => Currency, currency => currency.currency_id)
    @JoinColumn({ name: "currency_id" })
    currency!: Currency;
}
