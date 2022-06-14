import {Customer, CustomerCreateArgs} from '../../db/models/Customer';

export interface CustomerService {
    create: (arg: CustomerCreateArgs) => Promise<Customer>;
    update: (customerId: string, updateArgs: Partial<Customer>) => Promise<Customer>;
    delete: (customerId: string) => Promise<boolean>;
    getById: (customerId: string) => Promise<Customer | null>;
    getByIds: (customerIds: string[]) => Promise<Customer[]>;
}
