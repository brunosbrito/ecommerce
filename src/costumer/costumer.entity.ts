import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { IsString, IsEmail, Matches, IsNumber } from 'class-validator';

@Entity()
@Unique(['email'])
export class Costumer {
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
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @Column()
  @IsNumber()
  age: number;

  @Column()
  @IsString()
  adress: string;

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
