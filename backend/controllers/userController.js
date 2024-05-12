import {
    getUserById,
    login,
    register,
    update
} from '../services/userService.js';

export async function getUser(req, res) {
    try {
        const { customerId } = req.params;
        const user = await getUserById(customerId);
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Nie udało się pobrać danych użytkownika.', error: error.message });
    }
};

export async function loginUser(req, res){
    try {
        const { email, password } = req.body;
        const loginResult = await login(email, password);
        res.json(loginResult);
    } catch (error) {
        if (error.message === "Nieprawidłowy email lub hasło.") {
            return res.status(401).send({ message: error.message });
        }
        console.error('Błąd logowania:', error);
        res.status(500).send({ message: "Wystąpił błąd podczas logowania." });
    }
};

export async function registerUser(req, res) {
    try {
        const newUser = await register(req.body);
        res.status(201).send({ message: "Użytkownik został pomyślnie zarejestrowany.", userId: newUser.id });
    } catch (error) {
        if (error.message === "Użytkownik o podanym adresie email już istnieje.") {
            return res.status(400).send({ message: error.message });
        }
        console.error('Błąd rejestracji użytkownika:', error);
        res.status(500).send({ message: "Wystąpił błąd podczas rejestracji użytkownika." });
    }
};

export async function updateUser(req, res) {
    try {
        const { userId } = req.params;
        const userData = req.body;

        const updated = await update(userId, userData);

        if (!updated) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ message: 'User updated successfully.' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user.' });
    }
};
