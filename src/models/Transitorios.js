const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('transitorio', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        editable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}