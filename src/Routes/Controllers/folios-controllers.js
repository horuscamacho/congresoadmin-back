const {Folio} = require('../../db')

const newInvoice = async (req, res) => {
    const {id} = req.user
    const {text, decretoId, normaId, articuloId, transitorioId, parrafoId, fraccionId, incisoId} = req.body
    try{
        const nuevoFolio = Folio.create({
            text
        })
        nuevoFolio.setUsuario(id)
        nuevoFolio.setDecreto(decretoId)
        nuevoFolio.setNorma(normaId)
        nuevoFolio.setArticulo(articuloId)
        nuevoFolio.setTransitorio(transitorioId)
        nuevoFolio.setParrafo(parrafoId)
        nuevoFolio.setFraccion(fraccionId)
        nuevoFolio.setInciso(incisoId)
        res.status(200).send(nuevoFolio)
    }catch (e) {
        res.status(400).send(e.message)
    }
}


module.exports = {
    newInvoice
}