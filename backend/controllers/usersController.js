const bcrypt = require('bcryptjs');
const User = require('../models/user.model'); // Upewnij się, że ścieżka do modelu użytkownika jest poprawna

exports.register = async (req, res) => {
    try {
        const { email, password, name, surname } = req.body;

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
            name,
            surname
        });

        res.status(201).send({ message: "Użytkownik został pomyślnie zarejestrowany.", userId: newUser.id });
    } catch (error) {
        console.error('Błąd rejestracji użytkownika:', error);
        res.status(500).send({ message: "Wystąpił błąd podczas rejestracji użytkownika." });
    }
};
