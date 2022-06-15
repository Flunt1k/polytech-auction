import {SellerService} from './types';
import {Seller, SellerCreateArgs} from '../../db/models/Seller';
import {Op} from 'sequelize';
import {ModelStatic} from 'sequelize-typescript';
import {Order} from '../../db/models/Order';
import {Product} from '../../db/models/Product';

export class SellerServiceImpl implements SellerService {
    async create(args: SellerCreateArgs): Promise<Seller> {
        return Seller.create(args)
            .then((res) => {
                return res;
            })
            .catch((err: any) => {
                throw new Error(err);
            });
    }

    async delete(sellerId: string): Promise<boolean> {
        return Seller.destroy({where: {id: sellerId}})
            .then((res) => {
                return res >= 1;
            })
            .catch((err) => {
                throw new Error(err);
            });
    }

    async getAll(): Promise<Seller[]> {
        return Seller.findAll()
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    async getByEmail(email: string): Promise<Seller | null> {
        return Seller.findOne({where: {email}})
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    async getById(
        sellerId: string,
        includeOrders?: boolean,
        includeProduct?: boolean,
    ): Promise<Seller | null> {
        const searchOptions = {} as {include?: ModelStatic[]};

        if (includeOrders) {
            searchOptions.include = [Order];
        }

        if (includeProduct) {
            searchOptions.include = Array.isArray(searchOptions.include)
                ? [...searchOptions.include, Product]
                : [Product];
        }

        return Seller.findByPk(sellerId, searchOptions)
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    async getByIds(sellerIds: string[]): Promise<Seller[]> {
        return Seller.findAll({
            where: {
                id: {
                    [Op.or]: sellerIds,
                },
            },
        })
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    async update(sellerId: string, updateArgs: Partial<Seller>): Promise<Seller | null> {
        await Seller.update(updateArgs, {where: {id: sellerId}});

        return Seller.findByPk(sellerId)
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }
}
