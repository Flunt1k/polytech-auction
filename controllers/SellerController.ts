import {BaseController} from './index';
import {SellerServiceImpl} from '../services/SellerService';
import {SellerService} from '../services/SellerService/types';
import {Request, Response} from 'express';
import {Seller, SellerCreateArgs} from '../db/models/Seller';

export class SellerController extends BaseController {
    sellerService: SellerService;

    constructor(paths: any) {
        super(paths);
        this.sellerService = new SellerServiceImpl();
    }

    create = async (req: Request, res: Response) => {
        const body = req.body as SellerCreateArgs;
        try {
            const seller = await this.sellerService.create(body);

            res.status(201).json({data: {seller}});
        } catch (err: any) {
            throw new Error(err);
        }
    };

    update = async (req: Request, res: Response) => {
        const body = req.body as {sellerId: string; updateData: Partial<Seller>};
        const {sellerId, updateData} = body;
        try {
            const updatedSeller = await this.sellerService.update(sellerId, updateData);

            if (updatedSeller === null) {
                res.status(404).json({
                    data: {
                        message: 'Пользователь не найден',
                        status: 'failed',
                    },
                });
                return;
            }

            res.status(200).json({data: {seller: updatedSeller}});
        } catch (err: any) {
            throw new Error(err);
        }
    };

    delete = async (req: Request, res: Response) => {
        const {sellerId} = req.body as {sellerId: string};

        try {
            const isUserDeleted = await this.sellerService.delete(sellerId);

            if (isUserDeleted) {
                res.status(200).json({
                    data: {message: 'Пользователь удален', deleted: true, status: 'success'},
                });
            } else {
                res.status(404).json({
                    data: {
                        message: 'Пользователь не найден в базе',
                        deleted: false,
                        status: 'failed',
                    },
                });
            }
        } catch (err: any) {
            throw new Error(err);
        }
    };

    getSeller = async (req: Request, res: Response) => {
        const {sellerId, sellerIds, email} = req.query as {
            sellerId?: string;
            email?: string;
            sellerIds?: string[] | string;
        };

        console.log(sellerIds);

        try {
            if (sellerId || (sellerIds && typeof sellerIds === 'string')) {
                const seller = await this.sellerService.getById(sellerId || (sellerIds as string));

                if (seller) {
                    res.status(200).json({data: {seller}});
                } else {
                    res.status(404).json({
                        data: {message: `Пользователь с таким id не найден [${sellerId}]`},
                    });
                }
            } else if (email) {
                const seller = await this.sellerService.getByEmail(email);

                if (seller) {
                    res.status(200).json({data: {seller}});
                } else {
                    res.status(404).json({
                        data: {message: `Пользователь с таким email не найден [${email}]`},
                    });
                }
            } else if (sellerIds) {
                const sellers = await this.sellerService.getByIds(sellerIds as string[]);

                if (sellers.length) {
                    res.status(200).json({data: {sellers}});
                } else {
                    res.status(404).json({
                        data: {
                            message: `Пользователь с такими id не найден [${(
                                sellerIds as string[]
                            ).join(',')}]`,
                        },
                    });
                }
            } else {
                const sellers = await this.sellerService.getAll();

                res.status(200).json({data: {sellers}});
            }
        } catch (err: any) {
            throw new Error(err);
        }
    };
}
