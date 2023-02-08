const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('folio', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        open: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
}
