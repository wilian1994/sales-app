import { Product } from './Product';
import { Store } from './Store';
import { PaymentType } from './PaymentType';
import { Marketplace } from './Marketplace';

export class Order{
  _id? : string;
  product: Product;
  store: Store;
  marketplace: Marketplace;
  paymentType: PaymentType;
  requestCode: string;
  tracking: string;
  purchaseValue: number;
  purchaseDate: Date;
  deadline: number;
  receivedDate: Date;
  salesDate: Date;
  salesValue: number;
  investor: string;
  quantity: number;
  status: string;
}
