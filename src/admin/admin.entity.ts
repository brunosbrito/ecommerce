import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { IsString, IsEmail } from 'class-validator';

@Entity()
@Unique(['email'])
export class Admin {
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
}
