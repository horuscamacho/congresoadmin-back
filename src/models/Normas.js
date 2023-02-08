const { DataTypes } = require('sequelize')


module.exports = (sequelize) => {
    sequelize.define('norma', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        active: {
            type: DataTypes.DATEONLY,
        },
        editable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    })
}
