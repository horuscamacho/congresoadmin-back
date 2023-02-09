const {Usuario} = require("../../db");
const bcrypt = require("bcryptjs");
const getUser = (req, res) => {
    res.send(req.user)
}


const newUser = (req, res) => {
    const {username, password, name, last_name, permissions, admin} = req.body
    Usuario.findOne({where: {username}}).then(async (doc) => {
        if(doc) res.status(200).send(`El usuario ${username} ya existe, intenta con uno diferente.`)
        if(!doc){
            const hashPass = password ? await bcrypt.hash(password, 10) : await bcrypt.hash("123456", 10)
            const nuevoUsuario = await Usuario.create({
                username,
                password: hashPass,
                name,
                last_name,
                permissions,
                admin: admin ? admin : false
            })
            res.status(200).send(`El usuario ${username} ha sido creado correctamente.`)
        }
    })
}





module.exports = {
    getUser,
    newUser
}