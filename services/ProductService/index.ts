import {ProductService} from './types';
import {Product, ProductCreateArgs} from '../../db/models/Product';
import {Order} from '../../db/models/Order';
import {Seller} from '../../db/models/Seller';
import {ModelStatic} from 'sequelize-typescript';
import {Customer} from '../../db/models/Customer';

const validateIsExpired = (product: Product) => {
    const prDatetime = new Date(product.deadline).getTime();
    const currDatetime = new Date(Date.now()).getTime();

    return currDatetime > prDatetime;
};

export class ProductServiceImpl implements ProductService {
    create(args: ProductCreateArgs): Promise<Product> {
        return Product.create(args)
            .then((res) => {
                // @ts-ignore
                res.image = res.image.toString();
                return res;
            })
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
        limit?: number;
        offset?: number;
        includeOwner: boolean;
        includeOrder: boolean;
    }): Promise<Product[]> {
        const {limit, offset, includeOrder, includeOwner} = args;

        const searchOptions = {limit, offset, where: {expired: false}} as {
            include?: any;
            limit?: number;
            offset?: number;
        };

        if (includeOwner && includeOrder) {
            searchOptions.include = {all: true, nested: true};
        } else {
            if (includeOrder) {
                searchOptions.include = [{model: Order, nested: true}];
            }

            if (includeOwner) {
                searchOptions.include = Array.isArray(searchOptions.include)
                    ? [...searchOptions.include, {model: Seller}]
                    : [Seller];
            }
        }

        return Product.findAll(searchOptions)
            .then(async (res) => {
                const expiredIds: Set<string> = new Set<string>([]);
                const filtered = res.filter((pr) => {
                    const isDatetimeExpired = validateIsExpired(pr);

                    if (isDatetimeExpired) {
                        expiredIds.add(pr.id);
                        return false;
                    }

                    return true;
                });

                await Product.update({expired: true}, {where: {id: Array.from(expiredIds)}});

                return filtered.map((r: Product) => {
                    return {
                        ...r,
                        image: r.image.toString(),
                    } as unknown as Product;
                });
            })
            .catch((err) => {
                throw new Error(err);
            });
    }

    getById(args: {
        productId: string;
        includeOwner: boolean;
        includeOrder: boolean;
    }): Promise<Product | null> {
        const {productId} = args;

        return Product.findByPk(productId, {
            include: {all: true, nested: true},
            raw: true,
            nest: true,
        })
            .then(async (res) => {
                if (res === null) {
                    return null;
                }
                console.log(res);

                const isExpired = res.expired;

                if (isExpired) {
                    await Product.update({expired: true}, {where: {id: res.id}});
                    return null;
                }

                const isProductExpired = validateIsExpired(res);

                if (isProductExpired) {
                    await Product.update({expired: true}, {where: {id: res.id}});
                    res.expired = true;
                }

                // @ts-ignore
                res.image = res.image.toString();
                console.log(res);

                return res;
            })
            .catch((err) => {
                throw new Error(err);
            });
    }

    async getBySellerId(args: {sellerId: string; includeOrder: boolean}): Promise<Product[]> {
        const {sellerId, includeOrder} = args;
        const searchOptions = {} as {include?: ModelStatic[]};

        if (includeOrder) {
            searchOptions.include = [Order, Customer];
        }

        return Product.findAll({where: {ownerId: sellerId}, ...searchOptions})
            .then(async (res) => {
                return res.map((r: Product) => {
                    return {
                        ...r,
                        image: r.image.toString(),
                    } as unknown as Product;
                });
            })
            .catch((err) => {
                throw new Error(err);
            });
    }

    update(productId: string, updateData: Partial<Product>): Promise<Product | null> {
        return Product.update(updateData, {where: {id: productId}})
            .then(() => {
                return Product.findByPk(productId, {include: [Order, Seller, Customer]});
            })
            .then((res) => {
                if (res) {
                    //@ts-ignore
                    res.image = res.image.toString();
                }
                return res;
            })
            .catch((err) => {
                throw new Error(err);
            });
    }
}
