export interface Combo {
  id: number;
  name: string;
  price: number;
  city: string;
  products: Product[];
  serviceRegistries: ServiceRegistry[];
}

export interface Product {
  id: number;
  name: string;
  city: string;
  description: string;
  price: number;
}

export interface ServiceRegistry {
  id: number;
  name: string;
  city: string;
  description: string;
  price: number;
}
