import passport from 'passport';
import {Strategy} from 'passport-local';
import {Customer} from '../db/models/Customer';
import {Seller} from '../db/models/Seller';
import bcrypt from 'bcryptjs';

passport.use(
    new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                const {userType} = req.body as {userType: 'customer' | 'seller'};
                let user: Customer | Seller | null;
                if (userType === 'customer') {
                    user = await Customer.findOne({where: {email}});
                } else {
                    user = await Seller.findOne({where: {email}});
                }

                if (!user) {
                    return done(null, false, {message: 'Пользователь не существует!'});
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    return done(null, false, {message: 'Неверный пароль!'});
                }

                return done(null, user, {message: 'Пользователь вошел успешно'});
            } catch (err) {
                done(err);
            }
        },
    ),
);
