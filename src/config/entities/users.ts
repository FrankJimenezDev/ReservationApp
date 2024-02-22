import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Reserve } from "./reserves";

//Entity to use on dbconnection for Products
@Entity()
export class User extends BaseEntity {

    @PrimaryColumn({unique : true})
    id: string = uuidv4()

    @Column()
    name!: string 

    @Column()
    lastname!: string
    
    @Column({ unique: true })
    email!: string
    
    @Column()
    password!: string
    
    @Column({ type: "boolean", default: true})
    status!: boolean 
    
    @Column({ type: "boolean", default: false})
    rol!: boolean

    @CreateDateColumn()
    createdAt: Date = new Date()
    
    @UpdateDateColumn()
    updatedAt: Date = new Date()

    //campos de relacion

    @OneToMany(() => Reserve, reserve => reserve.id)
    @JoinColumn()
    createdReservers!: Reserve[];
}

//Entity to use on dbconnection for Products
