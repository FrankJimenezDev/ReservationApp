import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Reserve } from "./reserves";
import { UserRol } from "./roles";

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
    
    @Column({ type: "int", default: 0})
    rolcode!: number

    @CreateDateColumn()
    createdAt: Date = new Date()
    
    @UpdateDateColumn()
    updatedAt: Date = new Date()

    @ManyToOne(() => UserRol, rol => rol.rolcode)
    @JoinColumn({ name: "rolcode" })
    userRole!: UserRol;
}

