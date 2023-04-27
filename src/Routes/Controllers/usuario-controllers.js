const {Usuario} = require("../../db");
const bcrypt = require("bcryptjs");
const getUser = (req, res) => {
    res.send(req.user)
}


const newUser = async (req, res) => {
    try {
        const {username, password, name, email} = req.body
        const hashPass = await bcrypt.hash(password, 10)
        const nuevoUsuario = await Usuario.create({
            username,
            password: hashPass,
            name,
            email
        })
        res.status(200).send({message: 'Usuario creado correctamente'})
    } catch (e) {
        console.log(e.message)
    }
}


/*const hashPass = password ? await bcrypt.hash(password, 10) : await bcrypt.hash("123456", 10)
                const nuevoUsuario = await Usuario.create({
                    username,
                    password: hashPass,
                    name,
                    permissions,
                    email
                })*/

const getUsers = async(req, res) => {
    if(!req.user) return res.status(404).send("Necesitas iniciar sesión para poder acceder a esta ruta.")
    try{
        const usuarios = await Usuario.findAll({
            where: {
                admin: false
            },
            attributes: [
                "id", "username", "name", "last_name", "active", "permissions"
            ]
        })
        res.status(200).send(usuarios)
    }catch (e) {
        res.status(404).send(e.message)
    }
}


const getOneUSer = async (req, res) => {
    const {username} = req.body
    try{
        const usuario = await Usuario.findOne({
            where: {
                username
            },
            attributes: [
                "id", "name", "last_name", "permissions", "active"
            ]
        })
        res.status(200).send(usuario)
    }catch (e) {
        res.status(400).send(e.message)
    }
}

const checkUser = async (req, res) => {
    console.log(req.body)
    try{
        const {username, email} = req.body;
        const usuario = await Usuario.findAll(
            {where: {username: username}}
        )
        const correo = await Usuario.findAll(
            {
                where: {email: email}
            }
        )
        if(usuario.length > 0 || correo.length > 0)
        {
            res.status(220).send({
                availableUser: false,
            })
        } else {
            res.status(200).send({
                availableUser: true,
            })
        }
    }catch (e) {
        res.status(400).send(e.message)
    }
}

module.exports = {
    getUser,
    newUser,
    getUsers,
    getOneUSer,
    checkUser
}
