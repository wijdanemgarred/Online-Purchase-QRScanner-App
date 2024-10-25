export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
  }
  
  export const products: Product[] = [
    {
      id: 1,
      name: 'Produit A',
      price: 29.99,
      description: 'Description du produit A',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Produit B',
      price: 49.99,
      description: 'Description du produit B',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Produit C',
      price: 19.99,
      description: 'Description du produit C',
      image: 'https://via.placeholder.com/150',
    },
  ];
  