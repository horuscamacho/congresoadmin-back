const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('modificacione', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        publication: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        editable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
}