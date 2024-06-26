import { Combo } from '../combos/combo.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class ServiceRegistry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToMany(() => Combo)
  @JoinTable()
  combos: Combo[];
}
