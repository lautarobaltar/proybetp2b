const mongoClient = require('mongodb').MongoClient;
const chalk = require('chalk');

// TODO: cambiar por variables de entorno
const uriMongo = 'mongodb+srv://lautaroBaltar:0DNl2Q6Abt9HodFN@betp2-g3.rfslc.mongodb.net/BETP2-G3?retryWrites=true&w=majority';

const client = new mongoClient(uriMongo, {useUnifiedTopology: true, useNewUrlParser: true });

async function getConnection(){
    return await client.connect().catch(err => console.log(chalk.red(err)));
}

module.exports = {getConnection};

