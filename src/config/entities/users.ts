import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Roles } from "./roles";
import { Status } from "./status";
import { Reserve } from "./reserves";

//Entity to use on dbconnection for Products
@Entity()
export class User extends BaseEntity {

    @PrimaryColumn({unique : true})
    user_id: string = uuidv4()

    @Column()
    name!: string 

    @Column()
    lastname!: string
    
    @Column({ unique: true })
    email!: string
    
    @Column()
    password!: string 
    
    @Column({ type: "int", default: 0})
    rol_id!: number

    @Column({ type: "int", default: 1})
    status_id!: number

    @CreateDateColumn()
    createdAt: Date = new Date()
    
    @UpdateDateColumn()
    updatedAt: Date = new Date()

    @ManyToOne(() => Roles, rol => rol.role_id)
    @JoinColumn({ name: "rol_id" })
    userRole!: Roles;

    @ManyToOne(() => Status, status => status.status_id)
    @JoinColumn({ name: "status_id" })
    userStatus!: Status;

    @OneToMany(() => Reserve, reserve => reserve.reserve_id)
    user!: Reserve[];
}

