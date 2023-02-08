const {Usuario} = require('../db')
const bcrypt = require('bcryptjs')
const localStrategy = require('passport-local').Strategy

module.exports = function (passport) {
    passport.use(
        new localStrategy(async (username, password, done) => {
            const usuario = await Usuario.findOne({where: {username}})
            const data = usuario.dataValues
            if (!data) return done(null, false)
            bcrypt.compare(password, data.password, (err, result) => {
                if (err) throw err
                if (result) {
                    return done(null, data)
                } else {
                    return done(null, false)
                }
            })
        })
    )
    passport.serializeUser((user, cb) => {
        cb(null, user.id)
    })

    passport.deserializeUser(async (id, cb) => {
        const usuario = await Usuario.findOne({
            where: {id}
        })
        usuario.save()
        const data = usuario.dataValues
        const infoSend = {
            id: data.id,
            active: data.active,
            permisos: data.permisos,
            new: data.new,
            admin: data.admin
        }
        cb(null, infoSend)
    })
}