import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../config/dbConfig.js';


export async function getUserById(userId) {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('Klient nie został znaleziony.');
        }

        const response = {
            id: user.id,
            email: user.email,
            name: user.firstname,
            surname: user.lastname,
            city: user.city,
            street: user.street,
            address: user.address,
            postalCode: user.postalCode,
            phoneNumber: user.phoneNumber,
        };

        return response;

    } catch (error) {
        throw error;
    }
};

export async function login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error("Nieprawidłowy email lub hasło.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Nieprawidłowy email lub hasło.");
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    const response = {
        token: token,
        roles: user.roles,
        name: user.firstname,
        userId: user.userId
    }
    return response;
};


export async function register({ email, password, name, surname, city, street, address, phoneNumber, postalCode, termsAccepted }) {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
        throw new Error("Użytkownik o podanym adresie email już istnieje.");
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await User.create({
        email,
        password: hashedPassword,
        firstname: name,
        lastname: surname,
        city,
        street,
        address,
        postalCode,
        phoneNumber,
        termsAccepted
    });

    return newUser;
};

export async function update(userId, userData) {
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return false;
        }

        user.address = userData.address;
        user.city = userData.city;
        user.email = userData.email;
        user.firstname = userData.name;
        user.postalCode = userData.postalCode;
        user.phoneNumber = userData.phoneNumber;
        user.lastname = userData.surname;
        user.street = userData.street;
        user.username = userData.email;

        await user.save();
        return true;
    } catch (error) {
        console.error('Error updating user:', error);
        return false;
    }
};