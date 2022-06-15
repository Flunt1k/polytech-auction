import {OrderService} from './types';
import {Order, OrderCreateArgs} from '../../db/models/Order';

export class OrderServiceImpl implements OrderService {
    async create(args: OrderCreateArgs): Promise<Order> {
        return Order.create(args)
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    delete(orderId: string): Promise<boolean> {
        return Order.destroy({where: {id: orderId}})
            .then((res) => res >= 1)
            .catch((err) => {
                throw new Error(err);
            });
    }

    getAll(): Promise<Order[]> {
        return Order.findAll()
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    getByCustomerId(customerId: string): Promise<Order | null> {
        return Order.findOne({where: {customerId}})
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    getAllByCustomerId(customerId: string): Promise<Order[]> {
        return Order.findAll({where: {customerId}})
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    getById(orderId: string): Promise<Order | null> {
        return Order.findByPk(orderId)
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    getBySellerId(sellerId: string): Promise<Order | null> {
        return Order.findOne({where: {sellerId}})
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    update(orderId: string, updateArgs: Partial<Order>): Promise<Order | null> {
        return Order.update(updateArgs, {where: {id: orderId}})
            .then(() => {
                return Order.findByPk(orderId);
            })
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }
}
