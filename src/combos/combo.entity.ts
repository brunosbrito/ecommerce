import { ServiceRegistry } from 'src/service-registry/service-registry.entity';
import { Product } from 'src/products/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Combo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Product, { nullable: true })
  @JoinTable()
  products: Product[];

  @ManyToMany(() => ServiceRegistry, { nullable: true })
  @JoinTable()
  serviceRegistries: ServiceRegistry[];

  @Column()
  price: number;

  @Column()
  city: string;
}
