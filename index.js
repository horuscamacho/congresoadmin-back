const app = require('./src/app')
const {conn} = require('./src/db')

conn.sync({force: false}).then(() => {
    app.listen(3001,() => {
        console.log("%S listening on port 3001 ")
    })
})