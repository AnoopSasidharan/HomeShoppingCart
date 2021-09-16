import { Item } from "./item";
import { Shopitem } from "./shopitem";

export class Shop {
  mode: string;
  isEditMode: boolean;
  shopItems: Shopitem[];
  constructor(public id: number, public name: string) {
    this.isEditMode = false;
    this.shopItems = [];
  }
}
