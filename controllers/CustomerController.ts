import {Request, Response} from 'express';
import {BaseController} from './index';
import {StringMap} from '../types/misc';
import {CustomerCreateArgs} from '../db/models/Customer';
import {CustomerService} from '../services/CustomerService/types';

export class CustomerController extends BaseController {
    customerService: CustomerService;

    constructor(paths: StringMap, customerService: CustomerService) {
        super(paths);
        this.customerService = customerService;
    }
    async create(req: Request, res: Response) {
        const body = req.body as CustomerCreateArgs;
        const customer = await this.customerService.create(body);

        res.status(201).json(customer);
    }
}
