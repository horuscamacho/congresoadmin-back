const {Inciso} = require('../../db')


const newSubsection = async (req, res) =>{
    const {id} = req.user
    const {text, articuloId, transitorioId} = req.body
    try{
        const nuevoInciso = Inciso.create({
            text
        })
        nuevoInciso.setUsuario(id)
        nuevoInciso.setArticulo(articuloId)
        nuevoInciso.setTransitorio(transitorioId)
        res.status(200).send(nuevoInciso)
    }catch (e) {
        res.status(200).send(e.message)
    }
}


module.exports = {
    newSubsection
}