import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class UserRol {
  @PrimaryColumn()
  number!: number;

  @Column({ nullable: true, type: 'varchar', length: 45 })
  rol!: string;
}
