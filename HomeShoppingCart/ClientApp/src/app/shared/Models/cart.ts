import { ICart } from "./icart";
import { Item } from "./item";
import { Shop } from "./shop";

export class Cart {
  CurrentCart: ICart;
  shops: Shop[] = [];
}
