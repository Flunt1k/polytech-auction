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
        const customer = await this.customerService.create(body);

        res.status(201).json({data: {customer}});
    };

    update = async (req: Request, res: Response) => {
        const body = req.body as {customerId: string; updateData: Partial<Customer>};
        const {customerId, updateData} = body;
        const updatedCustomer = await this.customerService.update(customerId, updateData);

        if (updatedCustomer === null) {
            res.status(404).json({
                data: {
                    message: 'Пользователь не найден',
                    status: 'failed',
                },
            });
        }

        res.status(200).json({data: {customer: updatedCustomer}});
    };

    delete = async (req: Request, res: Response) => {
        const {customerId} = req.body as {customerId: string};

        const isUserDeleted = await this.customerService.delete(customerId);

        if (isUserDeleted) {
            res.status(200).json({
                data: {message: 'Пользователь удален', deleted: true, status: 'success'},
            });
        } else {
            res.status(404).json({
                data: {message: 'Пользователь не найден в базе', deleted: false, status: 'failed'},
            });
        }
    };

    getById = async (req: Request, res: Response) => {
        const {customerId} = req.query as {customerId?: string};

        const customer = await this.customerService.getById(customerId || '');

        if (customer) {
            res.status(200).json({data: {customer}});
        } else {
            res.status(404).json({data: {message: 'Пользователь с таким id не найден'}});
        }
    };
}
