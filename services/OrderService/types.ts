import {Order, OrderCreateArgs} from '../../db/models/Order';

export interface OrderService {
    create: (arg: OrderCreateArgs) => Promise<Order>;
    update: (orderId: string, updateArgs: Partial<Order>) => Promise<Order | null>;
    delete: (orderId: string) => Promise<boolean>;
    getById: (orderId: string) => Promise<Order | null>;
    getBySellerId: (sellerId: string) => Promise<Order | null>;
    getByCustomerId: (customerId: string) => Promise<Order | null>;
    getAllByCustomerId: (customerId: string) => Promise<Order[]>;
    getAll: () => Promise<Order[]>;
}
