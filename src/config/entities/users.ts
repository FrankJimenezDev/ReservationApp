import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { UserRol } from "./roles";
import { UserStatus } from "./status";
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
    
    @Column({ type: "int", default: 1})
    status!: number 
    
    @Column({ type: "int", default: 0})
    rol!: number

    @CreateDateColumn()
    createdAt: Date = new Date()
    
    @UpdateDateColumn()
    updatedAt: Date = new Date()

    @ManyToOne(() => UserRol, rol => rol.id)
    @JoinColumn({ name: "rol" })
    userRole!: UserRol;

    @ManyToOne(() => UserStatus, status => status.id)
    @JoinColumn({ name: "status" })
    userStatus!: UserStatus;

    @OneToMany(() => Reserve, reserve => reserve.id)
    user!: Reserve[];
}

