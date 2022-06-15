import {ProductService} from './types';
import {Product, ProductCreateArgs} from '../../db/models/Product';
import {Order} from '../../db/models/Order';
import {Seller} from '../../db/models/Seller';
import {ModelStatic} from 'sequelize-typescript';
import {Customer} from '../../db/models/Customer';

export class ProductServiceImpl implements ProductService {
    create(args: ProductCreateArgs): Promise<Product> {
        return Product.create(args)
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    delete(productId: string): Promise<boolean> {
        return Product.destroy({where: {id: productId}})
            .then((res) => res >= 1)
            .catch((err) => {
                throw new Error(err);
            });
    }

    getAll(args: {
        limit: number;
        offset: number;
        includeOwner: boolean;
        includeOrder: boolean;
    }): Promise<Product[]> {
        const {limit, offset, includeOrder, includeOwner} = args;

        const searchOptions = {limit, offset} as {
            include?: ModelStatic[];
            limit?: number;
            offset?: number;
        };

        if (includeOrder) {
            searchOptions.include = [Order, Customer];
        }

        if (includeOwner) {
            searchOptions.include = Array.isArray(searchOptions.include)
                ? [...searchOptions.include, Seller]
                : [Seller];
        }

        return Product.findAll(searchOptions)
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    getById(args: {
        productId: string;
        includeOwner: boolean;
        includeOrder: boolean;
    }): Promise<Product | null> {
        const {productId, includeOwner, includeOrder} = args;
        const searchOptions = {} as {include?: ModelStatic[]};

        if (includeOrder) {
            searchOptions.include = [Order, Customer];
        }

        if (includeOwner) {
            searchOptions.include = Array.isArray(searchOptions.include)
                ? [...searchOptions.include, Seller]
                : [Seller];
        }

        return Product.findByPk(productId, searchOptions)
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }

    update(productId: string, updateData: Partial<Product>): Promise<Product | null> {
        return Product.update(updateData, {where: {id: productId}})
            .then(() => {
                return Product.findByPk(productId, {include: [Order, Seller, Customer]});
            })
            .then((res) => res)
            .catch((err) => {
                throw new Error(err);
            });
    }
}
