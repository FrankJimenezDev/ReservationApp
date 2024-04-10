import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Status {
  @PrimaryColumn()
  status_id!: number;

  @Column({ nullable: false, type: 'varchar', length: 45 })
  status_name!: string;
}

