const {Norma} = require('../../db')

const newRule = async (req, res) => {
    const {id} = req.user
    const {name, decretoId} = req.body
    try{
        const nuevaNorma = await Norma.create({
            name
        })
        nuevaNorma.setUsuario(id)
        nuevaNorma.setDecreto(decretoId)
        res.status(200).send(nuevaNorma)
    }catch (e) {
        res.status(404).send(e.message)
    }
}


const getRules = async (req, res) => {
    if(!req.user) return res.status(401).send("Tu sesión ha expirado, vuelve a iniciar sesión.")
    try {
        const normas = await Norma.findAll()
        res.status(200).send(normas)
    }catch (e) {
        res.status(400).send(e.message)
    }
}





module.exports = {
    newRule,
    getRules
}