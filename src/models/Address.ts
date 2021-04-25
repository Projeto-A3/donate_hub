import  User  from './User';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';

@Entity('addresses')
export default class Address {

  @PrimaryGeneratedColumn('increment') 
  id: number; 

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  additionalAddress : string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

 // @Column({default:'x'})
 // userId: string= 'x';
 // @OneToMany(() => User, user => user.addressId)
  //@JoinColumn({name: 'userId'})
  //users: User[];

}
