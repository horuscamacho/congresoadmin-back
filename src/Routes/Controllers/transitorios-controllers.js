const {Transitorio} = require('../../db')

const newTransient = async (req, res) => {
    const {id} = req.user
    const {name, normaId} = req.body
    try{
        const nuevoTransitorio = await Transitorio.create({
            name
        })
        nuevoTransitorio.setUsuario(id)
        nuevoTransitorio.setNorma(normaId)
        res.status(200).send(nuevoTransitorio)
    }catch (e) {
        res.status(400).send(e.message)
    }
}


module.exports = {
    newTransient
}