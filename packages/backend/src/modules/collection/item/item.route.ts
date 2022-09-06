import { Router } from 'express';
import CollectionItemController from './item.controller';
import {
  parseItemPrice,
  createItemValidator,
  editItemValidator,
  parseQuantityPrice,
} from './item.validator';
export const itemRoute = Router();

itemRoute.post(
  '/',
  [parseItemPrice, parseQuantityPrice],
  createItemValidator,
  CollectionItemController.createItem,
);
itemRoute
  .route('/:itemId')
  .patch(
    [parseItemPrice, parseQuantityPrice],
    editItemValidator,
    CollectionItemController.updateItem,
  )
  .delete(CollectionItemController.deleteItem);
