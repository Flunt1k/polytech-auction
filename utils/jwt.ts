import {Customer} from '../db/models/Customer';
import {Seller} from '../db/models/Seller';
import jwt from 'jsonwebtoken';
import SECRETS from '../secrets';

export const generateJwtToken = (user: Customer | Seller) => {
    return jwt.sign({id: user.id, email: user.email}, SECRETS.JWT_SECRET as unknown as Buffer, {
        expiresIn: '30m',
    });
};
