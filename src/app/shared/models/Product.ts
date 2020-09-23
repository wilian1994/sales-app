import { Category } from "./Category";

export class Product {
  _id?: string;
  name?: string;
  category?: Category;
  quantity?: number;
  price?: number;
  lastedSale?: Date;
  days?: string;
  business?: string;
}
