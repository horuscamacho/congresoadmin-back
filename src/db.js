require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
    DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;


//const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/congreso`, {

/*
const sequelize = new Sequelize(`postgres://horus:PEcSNUHOJfEf9W2RgyHKUeif0eKY9fY7@dpg-cf7dvnh4reb2e0c81kb0-a.oregon-postgres.render.com/pruebascongreso`, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true,
        native: true
    },
});

 */

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/congreso`,
    {
        logging: false, // set to console.log to see the raw SQL queries
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
)




const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos los archivos de la carpeta Models, los traemos y los agregamos al modelDefiners

fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });
//Aquí hacemos la inyección de la conexion de (sequelize) a los modelos

modelDefiners.forEach(model => model(sequelize));

// Aquí capitalizamos los nombres de los modelos

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);



//Hasta aquí ya tenemos los modelos importados y hay que desestructurarlos
const { Usuario, Decreto, Modificacione, Norma, Articulo, Transitorio, Folio } = sequelize.models

//Acá inicio con las asociaciones
//USUARIOS
Usuario.hasMany(Decreto)
Decreto.belongsTo(Usuario)
Usuario.hasMany(Modificacione)
Modificacione.belongsTo(Usuario)
Usuario.hasMany(Norma)
Norma.belongsTo(Usuario)
Usuario.hasMany(Articulo)
Articulo.belongsTo(Usuario)
Usuario.hasMany(Transitorio)
Transitorio.belongsTo(Usuario)
Usuario.hasMany(Folio)
Folio.belongsTo(Usuario)


//DECRETOS
Decreto.hasOne(Norma)
Norma.belongsTo(Decreto)
Decreto.hasMany(Articulo)
Articulo.belongsTo(Decreto)


//MODIFICACIONES
Modificacione.belongsToMany(Norma, {through: "Modificacion_Norma"})
Norma.belongsToMany(Modificacione, {through: "Modificacion_Norma"})
Modificacione.belongsToMany(Articulo, {through: "Modificacion_Articulo"})
Articulo.belongsToMany(Modificacione, {through: "Modificacion_Articulo"})


//NORMAS
Norma.hasMany(Articulo)
Articulo.belongsTo(Norma)
Norma.hasMany(Transitorio)
Transitorio.belongsTo(Norma)


//FOLIOS
Folio.hasOne(Norma)
Norma.belongsTo(Folio)
Folio.hasOne(Modificacione)
Modificacione.belongsTo(Folio)
Folio.hasOne(Articulo)
Articulo.belongsTo(Folio)
Folio.hasOne(Transitorio)
Transitorio.belongsTo(Folio)


//
// console.log(sequelize.models)


module.exports = {
    ...sequelize.models,
    conn: sequelize,
}
