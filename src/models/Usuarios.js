const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('usuario', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(5),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.STRING,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        new: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
}