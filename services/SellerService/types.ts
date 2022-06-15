import {Seller, SellerCreateArgs} from '../../db/models/Seller';

export interface SellerService {
    create: (arg: SellerCreateArgs) => Promise<Seller>;
    update: (sellerId: string, updateArgs: Partial<Seller>) => Promise<Seller | null>;
    delete: (sellerId: string) => Promise<boolean>;
    getById: (sellerId: string) => Promise<Seller | null>;
    getByEmail: (email: string) => Promise<Seller | null>;
    getByIds: (sellerIds: string[]) => Promise<Seller[]>;
    getAll: () => Promise<Seller[]>;
}
