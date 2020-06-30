import { Order } from 'src/app/shared/models/Order';
import { Product } from './Product';
import { Store } from './Store';
import { PaymentType } from './PaymentType';
import { Marketplace } from './Marketplace';
import { STATUS } from './Status';

export class Sale {
  order?: Order;
  salesDate: Date;
  salesValue: number;
  investor: string;
  quantity: number;
  status: STATUS;
}
