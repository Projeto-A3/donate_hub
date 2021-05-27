import  Address from './Address';
import  Request from './Donations';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';


export enum Types {
  doador = 'doador',
  donatario = 'donatario',
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

  @OneToOne(()=> Address, address => address.user)
  address: Address;

  @OneToOne(()=> Request, request => request.donee)
  requestDonee: Request;

  @OneToMany(()=> Request, request => request.donor)
  requestDonor: Request;
  //@OneToOne(()=> Request, request => request.donor)
  //requestDonor: Request;

  @CreateDateColumn({ default: ()=> new Date() })
  createdAt: Date;

  @UpdateDateColumn({ default: ()=> new Date() }) 
  updatedAt: Date;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateDateUpdate() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
