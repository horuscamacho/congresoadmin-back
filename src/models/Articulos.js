const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('articulo', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        editable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    })
}