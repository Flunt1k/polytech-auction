import {CustomerService} from './types';
import {Customer, CustomerCreateArgs} from '../../db/models/Customer';
import {Op} from 'sequelize';
import {ModelStatic} from 'sequelize-typescript';
import {Order} from '../../db/models/Order';
import bcrypt from 'bcryptjs';
import SECRETS from '../../secrets';

export class CustomerServiceImpl implements CustomerService {
    async create(args: CustomerCreateArgs): Promise<Customer> {
        try {
            const salt = bcrypt.genSaltSync(SECRETS.SALT);
            const password = await bcrypt.hash(args.password, salt);
            return Customer.create({...args, password});
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

    async getById(customerId: string, include?: boolean): Promise<Customer | null> {
        const searchOptions = {} as {include?: ModelStatic[]};

        if (include) {
            searchOptions.include = [Order];
        }
        return Customer.findByPk(customerId, searchOptions)
            .then((res) => {
                return res;
            })
            .catch((err: any) => {
                throw new Error(err);
            });
    }

    async getByEmail(email: string, include?: boolean): Promise<Customer | null> {
        const searchOptions = {where: {email}} as {where: {email: string}; include?: ModelStatic[]};

        if (include) {
            searchOptions.include = [Order];
        }

        return Customer.findOne(searchOptions)
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

    async getAll(): Promise<Customer[]> {
        return Customer.findAll()
            .then((res) => res)
            .catch((err: any) => {
                throw new Error(err);
            });
    }
}
