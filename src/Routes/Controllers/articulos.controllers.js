const {Articulo} = require('../../db')

const newArticle = async (req, res) => {
    const {id} = req.user
    const {decretoId, normaId, name} = req.body
    try{
        const articuloNuevo = await Articulo.create({
            name
        })
        articuloNuevo.setUsuario(id)
        articuloNuevo.setDecreto(decretoId)
        articuloNuevo.setNorma(normaId)
        res.status(200).send(articuloNuevo)
    }catch (e) {
        res.status(400).send(e.message)
    }
}

module.exports = {
    newArticle
}