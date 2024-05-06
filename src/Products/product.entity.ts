import { Combo } from 'src/combos/combo.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Product {
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
