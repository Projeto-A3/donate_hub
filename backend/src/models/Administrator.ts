import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Types {
  doador = 'doador',
  donatario = 'donatario',
  admin = 'admin'
};

@Entity('administrators')
export default class User {
 
  @PrimaryGeneratedColumn('increment') 
  id: number; 

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({type:'enum', enum: Types, default: Types.doador})
  type: string = Types.doador;

}