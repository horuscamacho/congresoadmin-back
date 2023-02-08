const {Router} = require('express')
const {getUser} = require("./Controllers/usuario-controllers");
const {newDecree} = require("./Controllers/decretos-controller");
const {newRule} = require("./Controllers/normas-controllers");
const {newArticle} = require("./Controllers/articulos.controllers");
const {newTransient} = require("./Controllers/transitorios-controllers");


const router = Router()

//TRAER INFO DEL USUARIO
router.get('/user', getUser)

//DECRETOS
router.post('/newdecree', newDecree)

//NORMAS
router.post('/newrule', newRule)

//ARTICULOS
router.post('/newarticle', newArticle)

//TRANSITORIOS
router.post('/newtransient', newTransient)

//PARRAFOS
router.post('/newparragraph', )

//FRACCIONES
router.post('/newfraction',)

//INCISOS
router.post('/newsubsection', )




module.exports = router