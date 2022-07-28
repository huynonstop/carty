export interface CreateItemDTO {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  collectionId: string;
}
