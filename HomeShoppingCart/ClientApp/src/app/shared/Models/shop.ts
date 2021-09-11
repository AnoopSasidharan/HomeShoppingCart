import { Item } from "./item";
import { Shopitem } from "./shopitem";

export class Shop {
  id: number;
  name: string;
  isEditMode: boolean;
  shopItems: Shopitem[] = [];
}
