const express = require('express')
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const bodyParser = require('body-parser')
const {Usuario} = require('./db')
const app = express()
const routes = require('./Routes/index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(session({
    secret: "SECRETCODE",
    resave: true,
    saveUninitialized: true
}))

app.use(cookieParser('SECRETCODE'))
app.use(passport.initialize())
app.use(passport.session())
require('./Auth/passportStrategy')(passport)

app.post('/register',     (req, res) => {
    const {username, password, } = req.body
   Usuario.findOne({where: {username}}).then(async (doc) => {
       if(doc) res.status(200).send('User already exists')
        if(!doc){
            const hashPass = await bcrypt.hash(password, 10)
            const nuevoUsuario = await Usuario.create({
                username,
                password: hashPass,
                name: "prueba",
                last_name: "prueba"
            })
            res.status(200).send("User created")
        }
   })
})


app.post('/login', async(req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) throw err
        if(!user) res.status(200).send('Credenciales incorrectas')
        else {
            req.login(user, err => {
                if(err) throw err
                res.send("Successfully Authenticated")
            })
        }
    })(req, res, next)
})


app.use('/', routes)



module.exports = app

