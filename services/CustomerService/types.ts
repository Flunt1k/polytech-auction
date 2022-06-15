import {Customer, CustomerCreateArgs} from '../../db/models/Customer';

export interface CustomerService {
    create: (arg: CustomerCreateArgs) => Promise<Customer>;
    update: (customerId: string, updateArgs: Partial<Customer>) => Promise<Customer | null>;
    delete: (customerId: string) => Promise<boolean>;
    getById: (customerId: string, include?: boolean) => Promise<Customer | null>;
    getByEmail: (email: string, include?: boolean) => Promise<Customer | null>;
    getByIds: (customerIds: string[]) => Promise<Customer[]>;
    getAll: () => Promise<Customer[]>;
}
