const {Router} = require('express')
const {getUser, newUser, getUsers, getOneUSer} = require("./Controllers/usuario-controllers");
const {newDecree} = require("./Controllers/decretos-controller");
const {newRule, getRules} = require("./Controllers/normas-controllers");
const {newArticle} = require("./Controllers/articulos.controllers");
const {newTransient} = require("./Controllers/transitorios-controllers");
const {newParragraph} = require("./Controllers/parrafos-controllers");
const {newFraction} = require("./Controllers/fracciones-controllers");
const {newSubsection} = require("./Controllers/incisos-controllers");
const {newInvoice} = require("./Controllers/folios-controllers");


const router = Router()

//USUARIOS
router.get('/user', getUser)
router.get('/getusers', getUsers)
router.post('/getoneuser', getOneUSer)
router.post("/register", newUser)

//DECRETOS
router.post('/newdecree', newDecree)

//NORMAS
router.post('/newrule', newRule)
router.get('/getrules', getRules)

//ARTICULOS
router.post('/newarticle', newArticle)

//TRANSITORIOS
router.post('/newtransient', newTransient)

//PARRAFOS
router.post('/newparragraph', newParragraph)

//FRACCIONES
router.post('/newfraction', newFraction)

//INCISOS
router.post('/newsubsection', newSubsection)

//FOLIOS
router.post('/newinvoice', newInvoice)



module.exports = router