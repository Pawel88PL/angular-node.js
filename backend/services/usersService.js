const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../config/dbConfig');


const getCustomerById = async (customerId) => {
    try {
        const customer = await User.findByPk(customerId);
        if (!customer) {
            throw new Error('Klient nie został znaleziony.');
        }

        const response = {
            id: customer.id,
            email: customer.email,
            name: customer.firstname,
            surname: customer.lastname,
            city: customer.city,
            street: customer.street,
            address: customer.address,
            postalCode: customer.postalCode,
            phoneNumber: customer.phoneNumber,
        };

        return response;

    } catch (error) {
        throw error;
    }
};

const loginUser = async (email, password) => {
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


const registerUser = async ({ email, password, name, surname, city, street, address, phoneNumber, postalCode, termsAccepted }) => {
    // Sprawdzenie, czy użytkownik o takim emailu już istnieje
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
        throw new Error("Użytkownik o podanym adresie email już istnieje.");
    }

    // Hashowanie hasła
    const hashedPassword = await bcrypt.hash(password, 8);

    // Tworzenie nowego użytkownika
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

const updateCustomerAsync = async (customerId, customerData) => {
    try {
        const user = await User.findByPk(customerId);

        if (!user) {
            return false;
        }

        user.address = customerData.address;
        user.city = customerData.city;
        user.email = customerData.email;
        user.firstname = customerData.name;
        user.postalCode = customerData.postalCode;
        user.phoneNumber = customerData.phoneNumber;
        user.lastname = customerData.surname;
        user.street = customerData.street;
        user.username = customerData.email;

        await user.save();
        return true;
    } catch (error) {
        console.error('Error updating customer:', error);
        return false;
    }
};

module.exports = {
    getCustomerById,
    registerUser,
    loginUser,
    updateCustomerAsync
};