const {Decreto, Modificacione, Norma} = require('../../db')

////////////////////////////// CONTROLLERS DE LOS DECRETOS QUE CREAN NORMAS /////////////////////////
const newDecree = async (req, res) => {
    const {id} = req.user
    const {name, publication, rules} = req.body
    try{
        const decree = await Decreto.create({
            name,
            publication
        })
        decree.setUsuario(id)
        res.status(200).send(decree)
    }catch (e) {
        console.log(e)
        res.status(404).send(e.message)
    }
}

const getDecrees = async (req, res) => {
    try {
        const decretos = await Decreto.findAll()
        res.status(200).send(decretos)
    } catch (e) {
        res.status(400).send(e.message)
    }
}



/////////////////////////////// CONTROLLERS DE LOS DECRETOS QUE MODIFICAN NORMAS ///////////////////////


const newDecreeN = async (req, res) => {
    const {id} = req.user
    const {name, publication, rules} = req.body
    try {

        const modification = await Modificacione.create({
            name,
            publication
        })

        rules.map(async (name) => {
           const norma = await Norma.findOne({
                where: {
                    name
                }
            })
            modification.setNormas(norma)
        })

        res.status(200).send(modification)
    }catch (e) {
        res.status(404).send(e.message)
    }
}



const decreesModifications = async (req, res) => {
    const {id} = req.user
    try{
        const decretos = await Decreto.findAll()
        const modifications = await Modificacione.findAll()

        const data = [...decretos, ...modifications]
        res.status(200).send(data)
    }catch (e) {
        res.status(400).send(e.message)
    }
}



module.exports = {
    newDecree,
    getDecrees,
    newDecreeN,
    decreesModifications
}