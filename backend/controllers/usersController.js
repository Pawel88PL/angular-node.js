const { loginUser } = require('../services/usersService');
const { registerUser } = require('../services/usersService');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginResult = await loginUser(email, password);
        res.json(loginResult);
    } catch (error) {
        if (error.message === "Nieprawidłowy email lub hasło.") {
            return res.status(401).send({ message: error.message });
        }
        console.error('Błąd logowania:', error);
        res.status(500).send({ message: "Wystąpił błąd podczas logowania." });
    }
};

exports.register = async (req, res) => {
    try {
        const newUser = await registerUser(req.body);
        res.status(201).send({ message: "Użytkownik został pomyślnie zarejestrowany.", userId: newUser.id });
    } catch (error) {
        if (error.message === "Użytkownik o podanym adresie email już istnieje.") {
            return res.status(400).send({ message: error.message });
        }
        console.error('Błąd rejestracji użytkownika:', error);
        res.status(500).send({ message: "Wystąpił błąd podczas rejestracji użytkownika." });
    }
};
