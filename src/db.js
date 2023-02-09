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
const { Usuario, Decreto, Norma, Articulo, Transitorio, Parrafo, Fraccion, Inciso, Folio } = sequelize.models

//Acá inicio con las asociaciones
//USUARIOS
Usuario.hasMany(Decreto)
Decreto.belongsTo(Usuario)
Usuario.hasMany(Norma)
Norma.belongsTo(Usuario)
Usuario.hasMany(Articulo)
Articulo.belongsTo(Usuario)
Usuario.hasMany(Transitorio)
Transitorio.belongsTo(Usuario)
Usuario.hasMany(Parrafo)
Parrafo.belongsTo(Usuario)
Usuario.hasMany(Fraccion)
Fraccion.belongsTo(Usuario)
Usuario.hasMany(Inciso)
Inciso.belongsTo(Usuario)
Usuario.hasMany(Folio)
//DECRETOS
Decreto.hasMany(Norma)
Norma.belongsTo(Decreto)
Decreto.hasMany(Articulo)
Articulo.belongsTo(Decreto)
//NORMAS
Norma.hasMany(Articulo)
Articulo.belongsTo(Norma)
Norma.hasMany(Transitorio)
Transitorio.belongsTo(Norma)
//ARTICULOS
Articulo.hasMany(Parrafo)
Parrafo.belongsTo(Articulo)
Articulo.hasMany(Fraccion)
Fraccion.belongsTo(Articulo)
Articulo.hasMany(Inciso)
Inciso.belongsTo(Articulo)
//TRANSITORIO
Transitorio.hasMany(Parrafo)
Parrafo.belongsTo(Transitorio)
Transitorio.hasMany(Fraccion)
Fraccion.belongsTo(Transitorio)
Transitorio.hasMany(Inciso)
Inciso.belongsTo(Transitorio)
//PARRAFOS
Parrafo.hasMany(Inciso)
Inciso.belongsTo(Parrafo)
Parrafo.hasMany(Fraccion)
Fraccion.belongsTo(Parrafo)
//Folios
Folio.belongsTo(Usuario)
Folio.belongsTo(Decreto)
Folio.belongsTo(Norma)
Folio.belongsTo(Articulo)
Folio.belongsTo(Transitorio)
Folio.belongsTo(Articulo)
Folio.belongsTo(Parrafo)
Folio.belongsTo(Fraccion)
Folio.belongsTo(Inciso)


module.exports = {
    ...sequelize.models,
    conn: sequelize,
}