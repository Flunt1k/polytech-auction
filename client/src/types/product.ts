import {Order} from './order';
import {Seller} from './seller';

export type Product = {
    id: string;
    productName: string;
    imageLink: string;
    description: string;
    year: string;
    buyInPrice: number;
    initialPrice: number;
    deadline: string;
    expired: boolean;
    ownerId: string;
    owner: Seller;
    order: Order;
};

export type ProductCreateArgs = {
    productName: string;
    imageLink: string;
    description: string;
    year: string;
    buyInPrice?: number;
    initialPrice?: number;
    deadline?: string;
    ownerId?: string;
};

export type ProductCreateResponse = {
    product: Product;
};

export type ProductUpdateArgs = {
    productId: string;
    updateData: Partial<Product>;
};

export type ProductUpdateResponse =
    | {
          product: Product;
      }
    | {
          message: string;
          status: 'failed';
      };

export type ProductDeleteArgs = {
    productId: string;
};

export type ProductDeleteResponse = {
    message: string;
    deleted: boolean;
    status: 'failed' | 'success';
};

export type ProductGetArgs = {
    productId?: string;
    includeOrder?: boolean;
    includeOwner?: boolean;
    limit?: number;
    offset?: number;
};

export type ProductGetResponse =
    | {
          product: Product;
      }
    | {products: Product[]};
