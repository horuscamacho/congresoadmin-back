const {Decreto} = require('../../db')


const newDecree = async (req, res) => {
    console.log(req.body)
    const {id} = req.user
    const {text, publication} = req.body
    try{
        const decree = await Decreto.create({
            text,
            publication
        })
        decree.setUsuario(id)
        res.status(200).send(decree)
    }catch (e) {
        console.log(e)
        res.status(404).send(e.message)
    }
}



module.exports = {
    newDecree
}