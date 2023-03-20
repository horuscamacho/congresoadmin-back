const {Modificacione, Norma, Modificacion_Norma} = require('../../db')

const createModification = async (req, res) => {
    const { name, publication, rules} = req.body
    console.log(req.body)
    try{
        const createDecreto = await Modificacione.create({
            name,
            publication
        })

        rules.map(async (el) => {
            const elemento = await Norma.findAll({where: {id: el.id}})
            createDecreto.addNorma(elemento)
        })


        res.status(200).send(createDecreto)
    }catch (e) {
        res.status(400).send(e.message)
    }
}




module.exports = {
    createModification
}