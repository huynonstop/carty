export interface Item {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  createdAt: string;
  buyerId?: string;
  buyer?: any;
  collectionId?: string;
  collection?: any;
}
