import {Order} from './order';
import {Product} from './product';

export type Seller = {
    id: string;
    name: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    cash: number;
    orders?: Order[];
    sellItems?: Product[];
};

export type SellerCreateArgs = {
    name: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phone: string;
};

export type SellerDeleteArgs = {
    sellerId: string;
};

export type SellerUpdateArgs = {
    sellerId: string;
    updateData: Partial<Seller>;
};

export type SellerUpdateResponse =
    | {
          seller: Seller;
      }
    | {
          message: string;
          status: 'failed';
      };

export type SellerGetArgs = {
    sellerId?: string;
    email?: string;
    sellerIds?: string[];
    includeOrders?: boolean;
    includeProducts?: boolean;
};

export type SellerGetResponse =
    | {
          seller: Seller;
      }
    | {sellers: Seller[]};

export type SellerCreateResponse = {
    seller: Seller;
    token: string;
};

export type SellerDeleteResponse = {
    message: string;
    deleted: true;
    status: 'success' | 'failed';
};

export type SellerLoginResponse = {
    seller: Seller;
    token: string;
};
