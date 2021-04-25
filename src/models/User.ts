import  Address from './Address';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';


export enum Types {
  doador = 'doador',
  donatario = 'donatario',
  admin = 'admin'
};

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cpf_cnpj: string;

  @Column()
  phone: string;

  @Column()
  birthDate: Date;

  @Column('int',{default:0})
  status: number = 0;

  @Column({type:'enum', enum: Types, default: Types.doador})
  type: string = Types.doador;

  @Column('int',{default:0})
  dependents: number = 0;

  
  @OneToOne(type => Address, user => User)
  address: Address;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
