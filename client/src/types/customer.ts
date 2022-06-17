import {Order} from './order';

export type Customer = {
    id: string;
    name: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    cash: number;
    orders: Order[];
    type: 'customer';
};

export type CustomerCreateArgs = {
    name: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phone: string;
};

export type CustomerDeleteArgs = {
    customerId: string;
};

export type CustomerUpdateResponse =
    | {
          message: string;
          status: 'failed' | 'success';
      }
    | {customer: Customer};

export type CustomerUpdateArgs = {
    customerId: string;
    updateData: Partial<Customer>;
};

export type CustomerGetArgs = {
    customerId?: string;
    email?: string;
    customerIds?: string[];
    // include orders;
    include?: boolean;
};

export type CustomerGetResponse =
    | {
          customer: Customer;
      }
    | {customers: Customer[]};

export type CustomerCreateResponse = {
    customer: Customer;
    token: string;
};

export type CustomerDeleteResponse = {
    message: string;
    deleted: true;
    status: 'success' | 'failed';
};

export type CustomerLoginResponse = {
    customer: Customer;
    token: string;
};
