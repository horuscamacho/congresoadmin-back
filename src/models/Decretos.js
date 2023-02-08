const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('decreto', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        text: {
            type: DataTypes.STRING,
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