import {Request, Response} from 'express';
import {BaseController} from './index';
import {ProductServiceImpl} from '../services/ProductService';
import {ProductService} from '../services/ProductService/types';
import {Product, ProductCreateArgs} from '../db/models/Product';

export class ProductController extends BaseController {
    productService: ProductService;

    constructor(paths: any) {
        super(paths);
        this.productService = new ProductServiceImpl();
    }

    create = async (req: Request, res: Response) => {
        const body = req.body as ProductCreateArgs;
        try {
            const product = await this.productService.create(body);

            res.status(201).json({data: {product}});
        } catch (err: any) {
            throw new Error(err);
        }
    };

    update = async (req: Request, res: Response) => {
        const body = req.body as {productId: string; updateData: Partial<Product>};
        const {productId, updateData} = body;
        try {
            const updatedProduct = await this.productService.update(productId, updateData);

            if (updatedProduct === null) {
                res.status(404).json({
                    data: {
                        message: 'Товар не найден',
                        status: 'failed',
                    },
                });
                return;
            }

            res.status(200).json({data: {product: updatedProduct}});
        } catch (err: any) {
            throw new Error(err);
        }
    };

    delete = async (req: Request, res: Response) => {
        const {productId} = req.body as {productId: string};

        try {
            const isUserDeleted = await this.productService.delete(productId);

            if (isUserDeleted) {
                res.status(200).json({
                    data: {message: 'Товар удален', deleted: true, status: 'success'},
                });
            } else {
                res.status(404).json({
                    data: {
                        message: 'Товар не найден в базе',
                        deleted: false,
                        status: 'failed',
                    },
                });
            }
        } catch (err: any) {
            throw new Error(err);
        }
    };

    getProduct = async (req: Request, res: Response) => {
        const {productId, includeOrder, includeOwner, limit, offset} = req.query as {
            productId?: string;
            includeOrder?: number;
            includeOwner?: number;
            limit?: number;
            offset?: number;
        };

        try {
            if (productId) {
                const product = await this.productService.getById({
                    productId,
                    includeOrder: Boolean(includeOrder),
                    includeOwner: Boolean(includeOwner),
                });

                if (product) {
                    res.status(200).json({data: {product}});
                } else {
                    res.status(404).json({
                        data: {message: `Продукт с таким id не найден [${productId}]`},
                    });
                }
            } else {
                const products = await this.productService.getAll({
                    limit,
                    offset,
                    includeOwner: Boolean(includeOwner),
                    includeOrder: Boolean(includeOrder),
                });

                res.status(200).json({data: {products}});
            }
        } catch (err: any) {
            throw new Error(err);
        }
    };
}
