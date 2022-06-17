import {Customer} from './customer';
import {Product} from './product';
import {Seller} from './seller';

export type Order = {
    id: string;
    orderNumber: number;
    phone: string;
    email: string;
    deliveryAddress: string;
    isBuyIn: boolean;
    bet: number;
    customerId: string;
    customer?: Customer;
    sellerId: string;
    seller: Seller;
    productId: string;
    product: Product;
};

export type OrderCreateArgs = {
    orderId: string;
    customerId: string;
    productId: string;
    phone: string;
    email: string;
    deliveryAddress: string;
    isBuyIn: boolean;
    bet: number;
};

export type OrderDeleteArgs = {
    orderId: string;
};

export type OrderUpdateArgs = {
    orderId: string;
    updateData: Partial<Order>;
};

export type OrderGetArgs = {
    orderId?: string;
    customerId?: string;
    customerIdAll?: string;
    sellerId?: string;
    includeCustomer?: boolean;
    includeSeller?: boolean;
    includeProduct?: boolean;
    limit?: number;
    offset?: number;
};

export type OrderUpdateResponse =
    | {
          message: string;
          status: 'failed' | 'success';
      }
    | {order: Order};

export type OrderCreateResponse = {
    order: Order;
};

export type OrderGetResponse =
    | {
          order: Order;
      }
    | {orders: Order[]};

export type OrderDeleteResponse = {
    message: string;
    deleted: true;
    status: 'success' | 'failed';
};
