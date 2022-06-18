import passport from 'passport';
import {Strategy} from 'passport-local';
import jwtStrategy from 'passport-jwt';
import bcrypt from 'bcryptjs';
import {Customer} from '../db/models/Customer';
import {Seller} from '../db/models/Seller';
import SECRETS from '../secrets';

passport.use(
    new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                const type = req.body.type;
                let user: Customer | Seller | null;
                if (type === 'customer') {
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

const ExtractJWT = jwtStrategy.ExtractJwt;
const JWTStrategy = jwtStrategy.Strategy;

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: SECRETS.JWT_SECRET as unknown as Buffer,
        },
        async (jwt: {id: string; email: string}, done) => {
            try {
                let user: Customer | Seller | null = await Customer.findByPk(jwt.id);
                if (!user) {
                    user = await Seller.findByPk(jwt.id);
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        },
    ),
);
