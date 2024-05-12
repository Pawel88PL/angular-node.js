export default (sequelize, DataTypes) => {
    const User = sequelize.define('User',
        {
            userId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
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
            firstname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            street: {
                type: DataTypes.STRING,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            postalCode: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
            termsAccepted: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            roles: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'Client'
            }
        }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: false
    });

    return User;
};