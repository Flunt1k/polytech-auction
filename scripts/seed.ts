import {Customer} from '../db/models/Customer';
import {Seller} from '../db/models/Seller';
import {Order} from '../db/models/Order';
import '../db';

const createCustomer = () => {
    return (
        Customer.create({
            username: 'Test_Customer',
            name: 'Test_Customer_Name',
            lastName: 'Test_Customer_Last_Name',
            phone: '89112223344',
            password: 'test_password',
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
            password: 'test_seller',
            email: 'test_seller@gmail.com',
        })
            .then((res: Seller) => res)
            // eslint-disable-next-line no-console
            .catch((err: any) => console.log(err))
    );
};

const createOrder = (customerId: string, sellerId: string) => {
    return (
        Order.create({
            customerId,
            sellerId,
            phone: '89009998877',
            email: 'test_order@gmail.com',
            deliveryAddress: 'Order_City',
            productId: '',
        })
            .then((res: Order) => res)
            // eslint-disable-next-line no-console
            .catch((err: any) => console.log(err))
    );
};

const seedDataBase = async () => {
    const customer = await createCustomer();
    const seller = await createSeller();

    if (customer && seller) {
        await createOrder(customer.id, seller.id);
    }
};

seedDataBase().catch((err) => console.log(err));
