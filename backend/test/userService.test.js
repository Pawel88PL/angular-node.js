// test/userService.test.js
const { expect } = require('chai');
const sinon = require('sinon');
const userService = require('../services/usersService');
const User = require('../models/user'); // zakładając, że User to Twój model

describe('UserService', () => {
    describe('registerUser', () => {
        let stubs = [];

        afterEach(() => {
            // Przywracanie oryginalnych funkcji po każdym teście
            stubs.forEach(stub => stub.restore());
            stubs = [];
        });

        it('should throw an error if email already exists', async () => {
            // Mockowanie odpowiedzi z bazy danych
            const fakeUser = { email: 'test@example.com' };
            const findOneStub = sinon.stub(User, 'findOne').resolves(fakeUser);
            stubs.push(findOneStub);

            const userData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'John',
                surname: 'Doe',
                city: 'City',
                street: 'Street 1',
                address: 'Address 1',
                phoneNumber: '123456789',
                postalCode: '12345',
                termsAccepted: true
            };

            // Sprawdzenie rzucania błędu
            try {
                await userService.registerUser(userData);
                expect.fail('should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal("Użytkownik o podanym adresie email już istnieje.");
            }

            // Sprawdzenie, czy funkcja findOne została wywołana dokładnie raz
            expect(findOneStub.calledOnce).to.be.true;
        });

        // Tutaj można dodać więcej testów...
    });
});
