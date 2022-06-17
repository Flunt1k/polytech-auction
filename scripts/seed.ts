import {Customer} from '../db/models/Customer';
import {Seller} from '../db/models/Seller';
import {Order} from '../db/models/Order';
import '../db';
import {Product} from '../db/models/Product';
import bcrypt from 'bcryptjs';
import SECRETS from '../secrets';
import fs from 'fs';
import path from 'path';

const createCustomer = () => {
    return (
        Customer.create({
            username: 'Test_Customer',
            name: 'Test_Customer_Name',
            lastName: 'Test_Customer_Last_Name',
            phone: '89112223344',
            password: bcrypt.hashSync('test_password', bcrypt.genSaltSync(SECRETS.SALT)),
            email: 'test@gmail.com',
        })
            .then((res: Customer) => res)
            // eslint-disable-next-line no-console
            .catch((err: any) => console.log(err))
    );
};

const createSeller = () => {
    return (
        Seller.create({
            username: 'Test_Seller',
            name: 'Test_Seller_Name',
            lastName: 'Test_Seller_Last_Name',
            phone: '89556667788',
            password: bcrypt.hashSync('test_seller', bcrypt.genSaltSync(SECRETS.SALT)),
            email: 'test_seller@gmail.com',
        })
            .then((res: Seller) => res)
            // eslint-disable-next-line no-console
            .catch((err: any) => console.log(err))
    );
};

const createProduct = (sellerId: string) => {
    return Product.create({
        productName: 'Test_Product',
        image: fs.readFileSync(path.resolve(__dirname, 'abc.png')),
        description: 'Test_Description',
        year: '2021',
        buyInPrice: 10200,
        initialPrice: 6000,
        deadline: '07-11-2022',
        ownerId: sellerId,
    })
        .then((res) => res)
        .catch((err) => console.log(err));
};

const createOrder = (customerId: string, sellerId: string, productId: string) => {
    return (
        Order.create({
            customerId,
            sellerId,
            phone: '89009998877',
            email: 'test_order@gmail.com',
            deliveryAddress: 'Order_City',
            productId: productId,
            isBuyIn: false,
            bet: 7000,
        })
            .then(() => {
                return Order.create({
                    customerId,
                    sellerId,
                    phone: '89009998833',
                    email: 'test_order2@gmail.com',
                    deliveryAddress: 'Order_City',
                    productId: productId,
                    isBuyIn: true,
                    bet: 10200,
                });
            })
            // eslint-disable-next-line no-console
            .catch((err: any) => console.log(err))
    );
};

const seedDataBase = async () => {
    const customer = await createCustomer();
    const seller = await createSeller();

    if (customer && seller) {
        const product = await createProduct(seller.id);
        if (product) {
            await createOrder(customer.id, seller.id, product.id);
        }
    }
};

seedDataBase().catch((err) => console.log(err));
