import  User from './User';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne
} from 'typeorm';

@Entity('requests')
export default class Request {

  @PrimaryGeneratedColumn('increment') 
  id: number; 

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @Column('int',{default:0})
  status: number = 0;


  @OneToOne(()=> User, user => user.requestDonee)
  @JoinColumn()
  donee: User;

  
  @ManyToOne(()=> User, user => user.requestDonor)
  @JoinColumn()
  donor: User;


}