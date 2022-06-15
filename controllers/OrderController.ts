import {Request, Response} from 'express';
import {BaseController} from './index';
import {OrderService} from '../services/OrderService/types';
import {OrderServiceImpl} from '../services/OrderService';
import {Order, OrderCreateArgs} from '../db/models/Order';

export class OrderController extends BaseController {
    orderService: OrderService;

    constructor(paths: any) {
        super(paths);

        this.orderService = new OrderServiceImpl();
    }

    create = async (req: Request, res: Response) => {
        const args = req.body as OrderCreateArgs;

        try {
            const order = await this.orderService.create(args);

            res.status(201).json({data: {order}});
        } catch (err: any) {
            throw new Error(err);
        }
    };

    delete = async (req: Request, res: Response) => {
        const {orderId} = req.body as {orderId: string};

        try {
            const isOrderDeleted = await this.orderService.delete(orderId);

            const status = isOrderDeleted ? 'success' : 'failed';
            const statusCode = isOrderDeleted ? 200 : 404;
            const message = isOrderDeleted ? 'Заказ удален' : 'Заказа не найден';
            const deleted = isOrderDeleted;

            res.status(statusCode).json({data: {message, deleted, status}});
        } catch (err: any) {
            throw new Error(err);
        }
    };

    update = async (req: Request, res: Response) => {
        const {orderId, updateData} = req.body as {orderId: string; updateData: Partial<Order>};

        try {
            const updatedOrder = await this.orderService.update(orderId, updateData);

            if (updatedOrder === null) {
                res.status(404).json({
                    data: {
                        message: 'Заказ не найден',
                        status: 'failed',
                    },
                });
                return;
            }

            res.status(200).json({data: {order: updatedOrder}});
        } catch (err: any) {
            throw new Error(err);
        }
    };

    getOrder = async (req: Request, res: Response) => {
        const {
            orderId,
            customerIdAll,
            customerId,
            sellerId,
            includeCustomer,
            includeSeller,
            includeProduct,
            limit,
            offset,
        } = req.query as {
            orderId?: string;
            customerId?: string;
            customerIdAll?: string;
            sellerId?: string;
            includeCustomer?: number;
            includeSeller?: number;
            includeProduct?: number;
            limit?: number;
            offset?: number;
        };

        try {
            if (orderId) {
                const order = await this.orderService.getById(orderId);

                if (order) {
                    res.status(200).json({data: {order}});
                } else {
                    res.status(404).json({data: {message: 'Заказ не найден', status: 'failed'}});
                }
            } else if (customerId) {
                const order = await this.orderService.getByCustomerId(customerId);

                if (order) {
                    res.status(200).json({data: {order}});
                } else {
                    res.status(404).json({data: {message: 'Заказ не найден', status: 'failed'}});
                }
            } else if (customerIdAll) {
                const orders = await this.orderService.getAllByCustomerId(customerIdAll);

                res.status(200).json({data: {orders}});
            } else if (sellerId) {
                const order = await this.orderService.getBySellerId(sellerId);

                if (order) {
                    res.status(200).json({data: {order}});
                } else {
                    res.status(404).json({data: {message: 'Заказ не найден', status: 'failed'}});
                }
            } else {
                const orders = await this.orderService.getAll(
                    Boolean(includeCustomer),
                    Boolean(includeSeller),
                    Boolean(includeProduct),
                    limit,
                    offset,
                );

                res.status(200).json({data: {orders}});
            }
        } catch (err: any) {
            throw new Error(err);
        }
    };
}
