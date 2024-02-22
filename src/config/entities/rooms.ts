import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

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
}

//Entity to use on dbconnection for Products
