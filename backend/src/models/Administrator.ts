import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import bcrypt from 'bcrypt';

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
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  type: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}