const { getCustomerById, loginUser, registerUser, updateCustomerAsync } = require('../services/usersService');

exports.getCustomer = async (req, res) => {
    try {
        const { customerId } = req.params;
        const customer = await getCustomerById(customerId);
        res.json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ message: 'Nie udało się pobrać danych klienta.', error: error.message });
    }
};

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

exports.updateCustomer = async (req, res) => {
    try {
        const { customerId } = req.params;
        const customerData = req.body;

        const updated = await updateCustomerAsync(customerId, customerData);

        if (!updated) {
            return res.status(404).json({ message: 'Customer not found.' });
        }

        res.json({ message: 'Customer updated successfully.' });
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ message: 'Error updating customer.' });
    }
};
