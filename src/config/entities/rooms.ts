import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Reserve } from "./reserves";
import { RoomStatus } from "./status";

//Entity to use on dbconnection for Products
@Entity()
export class Room extends BaseEntity {

    @PrimaryColumn({unique : true})
    id!: string

    @Column()
    size!: string 

    @Column({ type: "int", default: 0})
    status!: number

    @Column()
    price!: number

    @CreateDateColumn()
    createdAt: Date = new Date()
    
    @UpdateDateColumn()
    updatedAt: Date = new Date()

    // campos de relacion

    @OneToOne(() => Reserve, reserve => reserve.id)
    roomReserve!: Reserve;

    @ManyToOne(() => RoomStatus, status => status.id)
    @JoinColumn({ name: "status" })
    roomStatus!: RoomStatus;
}

//Entity to use on dbconnection for Products
