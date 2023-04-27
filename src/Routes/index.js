const {Router} = require('express')
const {getUser, newUser, getUsers, getOneUSer, checkUser} = require("./Controllers/usuario-controllers");
const {newDecree, getDecrees, newDecreeN, decreesModifications} = require("./Controllers/decretos-controller");
const {newRule, getRules} = require("./Controllers/normas-controllers");
const {newArticle} = require("./Controllers/articulos.controllers");
const {newTransient} = require("./Controllers/transitorios-controllers");

const {newInvoice} = require("./Controllers/folios-controllers");
const {createModification} = require("./Controllers/modificaciones.controllers");


const router = Router()

//USUARIOS
router.get('/user', getUser)
router.get('/getusers', getUsers)
router.post('/getoneuser', getOneUSer)
router.post("/register", newUser)
router.post('/check-user', checkUser)

//DECRETOS-MODIFICACIONES
router.post('/newdecree', newDecree)
router.get('/getdecrees', getDecrees)
router.get('/decreesmodifications', decreesModifications)
router.post('/decreenew', newDecreeN)
router.post('/newmodif', createModification)


//NORMAS
router.post('/newrule', newRule)
router.get('/getrules', getRules)

//ARTICULOS
router.post('/newarticle', newArticle)


//TRANSITORIOS
router.post('/newtransient', newTransient)



//FOLIOS
router.post('/newinvoice', newInvoice)



module.exports = router
