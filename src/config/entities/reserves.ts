import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Room } from './rooms';

//Entity to use on dbconnection for Products
@Entity()
export class Reserve extends BaseEntity {

    @PrimaryColumn({ unique: true })
    id: string = uuidv4()

    @Column({ type: "boolean", default: true })
    status!: boolean

    @Column()
    userid!: string

    @Column()
    roomid!: string

    @CreateDateColumn()
    createdAt: Date = new Date()

    @UpdateDateColumn()
    updatedAt: Date = new Date()
}

//Entity to use on dbconnection for Products
