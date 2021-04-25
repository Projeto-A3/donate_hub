import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';
import  Address  from './Address';


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

  //@ManyToOne(() => Address, address => address.users)
 // @JoinColumn({ name: 'addressId'})
  //addressId: Address;

  /*@OneToOne(() => Address, (address: Address) => address.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  public address: Address;
*/
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
