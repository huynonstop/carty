export interface CreateCollectionDTO {
  name: string;
  ownerId: string;
  isPublic: boolean;
  description?: string;
  tags: string[];
}
