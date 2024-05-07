import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { IsString, IsEmail, IsNumber } from 'class-validator';

@Entity()
@Unique(['email'])
export class Custumer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @IsNumber()
  age: number;

  @Column()
  @IsString()
  address: string;

  @Column()
  @IsString()
  zipCode: string;

  @Column()
  @IsString()
  state: string;

  @Column()
  @IsString()
  city: string;
}
