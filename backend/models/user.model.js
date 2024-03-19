module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // Definiowanie pól modelu
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Dodaj inne pola zgodnie z potrzebami
    }, {
        // opcjonalne ustawienia modelu
    });

    return User;
};