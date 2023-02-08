const {Fraccion} = require('../../db')

const newFraction = async (req, res) => {
    const {id} = req.user
    const {text, articuloId, transitorioId} = req.body
    try{
        const nuevaFraccion = await Fraccion.create({
            text
        })
        nuevaFraccion.setUsuario(id)
        nuevaFraccion.setArticulo(articuloId)
        nuevaFraccion.setTransitorio(transitorioId)
        res.status(200).send(nuevaFraccion)
    }catch (e) {
        res.status(400).send(e.message)
    }
}

module.exports = {
    newFraction
}