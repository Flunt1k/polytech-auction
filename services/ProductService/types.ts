import {Product, ProductCreateArgs} from '../../db/models/Product';

export interface ProductService {
    create: (args: ProductCreateArgs) => Promise<Product>;
    delete: (productId: string) => Promise<boolean>;
    update: (productId: string, updateData: Partial<Product>) => Promise<Product | null>;
    getById: (args: {
        productId: string;
        includeOwner: boolean;
        includeOrder: boolean;
    }) => Promise<Product | null>;
    getAll: (args: {
        limit?: number;
        offset?: number;
        includeOwner: boolean;
        includeOrder: boolean;
    }) => Promise<Product[]>;
    getBySellerId: (args: {sellerId: string; includeOrder: boolean}) => Promise<Product[]>;
}
