const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../config/dbConfig');


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

module.exports = {
    registerUser,
    loginUser
};