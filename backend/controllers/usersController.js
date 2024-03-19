const bcrypt = require('bcryptjs');
const { User } = require('../config/dbConfig');

exports.register = async (req, res) => {
    try {
        const { email, password, name, surname, city, street, address, phoneNumber, postalCode, termsAccepted } = req.body;

        // Sprawdzenie, czy użytkownik o takim emailu już istnieje
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).send({ message: "Użytkownik o podanym adresie email już istnieje." });
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

        res.status(201).send({ message: "Użytkownik został pomyślnie zarejestrowany.", userId: newUser.id });
    } catch (error) {
        console.error('Błąd rejestracji użytkownika:', error);
        res.status(500).send({ message: "Wystąpił błąd podczas rejestracji użytkownika." });
    }
};
