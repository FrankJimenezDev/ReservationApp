import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

//Entity to use on dbconnection for Products
@Entity()
export class User extends BaseEntity {

    @PrimaryColumn()
    id: string = uuidv4()

    @Column({ unique : true })
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
}

//Entity to use on dbconnection for Products
