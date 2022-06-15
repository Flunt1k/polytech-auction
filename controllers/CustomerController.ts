import {Request, Response} from 'express';
import {BaseController} from './index';
import {Customer, CustomerCreateArgs} from '../db/models/Customer';
import {CustomerService} from '../services/CustomerService/types';
import {CustomerServiceImpl} from '../services/CustomerService';

export class CustomerController extends BaseController {
    customerService: CustomerService;

    constructor(paths: any) {
        super(paths);
        this.customerService = new CustomerServiceImpl();
    }

    create = async (req: Request, res: Response) => {
        const body = req.body as CustomerCreateArgs;
        try {
            const customer = await this.customerService.create(body);

            res.status(201).json({data: {customer}});
        } catch (err: any) {
            throw new Error(err);
        }
    };

    update = async (req: Request, res: Response) => {
        const body = req.body as {customerId: string; updateData: Partial<Customer>};
        const {customerId, updateData} = body;
        try {
            const updatedCustomer = await this.customerService.update(customerId, updateData);

            if (updatedCustomer === null) {
                res.status(404).json({
                    data: {
                        message: 'Пользователь не найден',
                        status: 'failed',
                    },
                });
                return;
            }

            res.status(200).json({data: {customer: updatedCustomer}});
        } catch (err: any) {
            throw new Error(err);
        }
    };

    delete = async (req: Request, res: Response) => {
        const {customerId} = req.body as {customerId: string};

        try {
            const isUserDeleted = await this.customerService.delete(customerId);

            if (isUserDeleted) {
                res.status(200).json({
                    data: {message: 'Пользователь удален', deleted: true, status: 'success'},
                });
            } else {
                res.status(404).json({
                    data: {
                        message: 'Пользователь не найден в базе',
                        deleted: false,
                        status: 'failed',
                    },
                });
            }
        } catch (err: any) {
            throw new Error(err);
        }
    };

    getCustomer = async (req: Request, res: Response) => {
        const {customerId, customerIds, email, include} = req.query as {
            customerId?: string;
            email?: string;
            customerIds?: string[] | string;
            include?: number;
        };

        try {
            if (customerId || (customerIds && typeof customerIds === 'string')) {
                const customer = await this.customerService.getById(
                    customerId || (customerIds as string),
                    Boolean(include),
                );

                if (customer) {
                    res.status(200).json({data: {customer}});
                } else {
                    res.status(404).json({
                        data: {message: `Пользователь с таким id не найден [${customerId}]`},
                    });
                }
            } else if (email) {
                const customer = await this.customerService.getByEmail(email, Boolean(include));

                if (customer) {
                    res.status(200).json({data: {customer}});
                } else {
                    res.status(404).json({
                        data: {message: `Пользователь с таким email не найден [${email}]`},
                    });
                }
            } else if (customerIds) {
                const customers = await this.customerService.getByIds(customerIds as string[]);

                if (customers.length) {
                    res.status(200).json({data: {customers}});
                } else {
                    res.status(404).json({
                        data: {
                            message: `Пользователь с такими id не найден [${(
                                customerIds as string[]
                            ).join(',')}]`,
                        },
                    });
                }
            } else {
                const customers = await this.customerService.getAll();

                res.status(200).json({data: {customers}});
            }
        } catch (err: any) {
            throw new Error(err);
        }
    };
}
