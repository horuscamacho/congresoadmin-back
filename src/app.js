const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./Routes/index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(session({
    secret: "CONGRESO2023",
    resave: true,
    saveUninitialized: true
}))
app.use(morgan('dev'))
app.use(cookieParser('CONGRESO2023'))
app.use(passport.initialize())
app.use(passport.session())
require('./Auth/passportStrategy')(passport)
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});



app.post('/login', async(req, res, next) => {
    console.log(req.body)
    passport.authenticate('local', (err, user, info) => {
        if(err) throw err
        if(!user) res.status(200).send('Credenciales incorrectas')
        else {
            req.login(user, err => {
                if(err) throw err
                const datosLocalStorage = {
                    message: "Inicio de Sesión correcto",
                    status: user.active,
                    account: user.new,
                    permissions: user.permissions,
                    admin: user.admin
                }
                res.status(200).send(datosLocalStorage)
            })
        }
    })(req, res, next)
})


app.use('/', routes)



module.exports = app

