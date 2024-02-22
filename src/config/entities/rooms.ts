import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Reserve } from "./reserves";

//Entity to use on dbconnection for Products
@Entity()
export class Room extends BaseEntity {

    @PrimaryColumn({unique : true})
    id!: number 

    @Column()
    size!: string 

    @Column({ type: "boolean", default: false})
    status!: boolean

    @Column()
    price!: number

    @CreateDateColumn()
    createdAt: Date = new Date()
    
    @UpdateDateColumn()
    updatedAt: Date = new Date()

    // campos de relacion

    @OneToOne(() => Reserve, reserve => reserve.id)
    @JoinColumn()
    reserveid!: Reserve;
}

//Entity to use on dbconnection for Products
