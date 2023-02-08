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






module.exports = {
    newRule
}