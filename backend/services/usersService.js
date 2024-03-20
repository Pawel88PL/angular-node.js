const bcrypt = require('bcryptjs');
const { User } = require('../config/dbConfig');

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
};