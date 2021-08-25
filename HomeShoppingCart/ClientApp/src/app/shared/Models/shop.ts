import { Item } from "./item";

export class Shop {
  id: number;
  name: string;
  isEditMode: boolean;
  items: Item[] = [];
}
