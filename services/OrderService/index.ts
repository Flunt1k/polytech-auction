import {OrderService} from './types';
import {Order, OrderCreateArgs} from '../../db/models/Order';
import {Customer} from '../../db/models/Customer';
import {Seller} from '../../db/models/Seller';
import {ModelStatic} from 'sequelize-typescript';
import {Product} from '../../db/models/Product';

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

    getAll(
        includeCustomer?: boolean,
        includeSeller?: boolean,
        includeProduct?: boolean,
        limit?: number,
        offset?: number,
    ): Promise<Order[]> {
        const searchOptions = {limit, offset} as {
            include?: ModelStatic[];
            limit?: number;
            offset?: number;
        };

        if (includeCustomer) {
            searchOptions.include = [Customer];
        }

        if (includeSeller) {
            searchOptions.include = Array.isArray(searchOptions.include)
                ? [...searchOptions.include, Seller]
                : [Seller];
        }

        if (includeProduct) {
            searchOptions.include = Array.isArray(searchOptions.include)
                ? [...searchOptions.include, Product]
                : [Product];
        }

        return Order.findAll(searchOptions)
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    getByCustomerId(customerId: string): Promise<Order | null> {
        return Order.findOne({where: {customerId}, include: [Customer, Product, Seller]})
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    getAllByCustomerId(customerId: string): Promise<Order[]> {
        return Order.findAll({where: {customerId}, include: [Customer, Product, Seller]})
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    getById(orderId: string): Promise<Order | null> {
        return Order.findByPk(orderId, {include: [Customer, Product, Seller]})
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    getBySellerId(sellerId: string): Promise<Order | null> {
        return Order.findOne({where: {sellerId}, include: [Seller]})
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
