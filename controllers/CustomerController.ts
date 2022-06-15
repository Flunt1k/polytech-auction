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

        res.status(201).json(customer);
    };

    update = async (req: Request, res: Response) => {
        const body = req.body as {customerId: string; updateData: Partial<Customer>};
        const {customerId, updateData} = body;
        const updatedCustomer = await this.customerService.update(customerId, updateData);

        if (updatedCustomer === null) {
            res.status(500).json({
                message: 'Пользователь не найден',
            });
        }

        res.status(200).json(updatedCustomer);
    };
}
