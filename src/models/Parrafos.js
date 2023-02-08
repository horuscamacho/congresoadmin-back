const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('parrafo', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        text: {
            type: DataTypes.STRING(10000),
            allowNull: false
        },
        number: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        editable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
}