const bcrypt = require('bcryptjs');
const dbService = require('../services/dbService');

exports.register = async (req, res) => {
    const { email, password, name, surname, city, postalCode, street, address, phoneNumber } = req.body;

    try {
        // Sprawdzenie, czy użytkownik o takim emailu już istnieje
        const users = await dbService.querySql('SELECT email FROM Users WHERE email = ?', [email]);
        if (users.length > 0) {
            return res.status(400).send({ message: "Użytkownik o podanym adresie email już istnieje." });
        }

        // Hashowanie hasła
        const hashedPassword = await bcrypt.hash(password, 6);

        // Wstawianie nowego użytkownika do bazy danych
        const insertQuery = 'INSERT INTO Users (Email, Password, FirstName, LastName) VALUES (?, ?, ?, ?)';
        await dbService.querySql(insertQuery, [email, hashedPassword, name, surname]);

        res.status(201).send({ message: "Użytkownik został pomyślnie zarejestrowany." });
    } catch (error) {
        console.error('Błąd rejestracji użytkownika:', error);
        res.status(500).send({ message: "Wystąpił błąd podczas rejestracji użytkownika." });
    }
};
