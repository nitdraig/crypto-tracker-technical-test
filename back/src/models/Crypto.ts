import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Crypto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name!: string;

  @Column()
  ticker!: string;

  @Column()
  purchasePrice!: number;

  @Column()
  quantity!: number;
}
