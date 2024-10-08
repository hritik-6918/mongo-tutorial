const {MongoClient} = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';

const dbName = 'login_form';

const client = new MongoClient(url);

const connectToDatabase = async()=>{
    try{
        await client.connect();
        console.log('connected successfully to the database');
        const db = client.db(dbName);
        return db;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {connectToDatabase};