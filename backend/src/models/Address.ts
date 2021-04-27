import User from './User';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
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
  additionalDetails : string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;
  
  @OneToOne(()=> User, user => user.address)
  @JoinColumn()
  user: User;
  
}
