const {Parrafo} = require('../../db')


const newParragraph = async (req, res) => {
    const {id} = req.user
    const {text, articuloId, transitorioId} = req.body
    try{
        const parrafoNuevo = await Parrafo.create({
            text
        })
        parrafoNuevo.setUsuario(id)
        parrafoNuevo.setArticulo(articuloId)
        parrafoNuevo.setTransitorio(transitorioId)
        res.status(200).send(parrafoNuevo)
    }catch (e) {
        res.status(400).send(e.message)
    }
}

module.exports = {
    newParragraph
}