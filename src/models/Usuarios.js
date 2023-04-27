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
            type: DataTypes.STRING(8),
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
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        img : {
            type: DataTypes.STRING,
            defaultValue: 'https://firebasestorage.googleapis.com/v0/b/logos-img.appspot.com/o/user.png?alt=media&token=f420b469-d604-452e-a306-f4a5601596f7'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}
