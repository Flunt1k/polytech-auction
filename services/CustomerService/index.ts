import {CustomerService} from './types';
import {Customer, CustomerCreateArgs} from '../../db/models/Customer';
import {Op} from 'sequelize';

export class CustomerServiceImpl implements CustomerService {
    async create(args: CustomerCreateArgs): Promise<Customer> {
        try {
            return Customer.create(args);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async update(
        customerId: string,
        updateArgs: Partial<Omit<Customer, 'id'>>,
    ): Promise<Customer | null> {
        try {
            await Customer.update(updateArgs, {
                where: {id: customerId},
            });

            return Customer.findByPk(customerId);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async delete(customerId: string): Promise<boolean> {
        return Customer.destroy({where: {id: customerId}})
            .then((res) => {
                return res >= 1;
            })
            .catch((e) => {
                throw new Error(e);
            });
    }

    async getById(customerId: string): Promise<Customer | null> {
        return Customer.findByPk(customerId)
            .then((res) => {
                return res;
            })
            .catch((err: any) => {
                throw new Error(err);
            });
    }

    async getByIds(customerIds: string[]): Promise<Customer[]> {
        return Customer.findAll({
            where: {
                id: {
                    [Op.or]: customerIds,
                },
            },
        })
            .then((res) => {
                return res;
            })
            .catch((err: any) => {
                throw new Error(err);
            });
    }
}
