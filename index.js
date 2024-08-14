const express = require ('express');
const app = express();
const {connectToDatabase} = require('./database');

//get
app.get('/log_reg_forms',async(req,res)=>{
    try{
        const db = await connectToDatabase();
        const collection = db.collection('log_reg_forms');
        const users = await collection.find().toArray();
        res.json(users);
    }
    catch(error){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
})

//post(create)

app.use(express.json()); //middleware

app.post('/log_reg_forms', async(req,res)=>{
    console.log(req.body);
    const db = await connectToDatabase();
    const collection = db.collection('log_reg_forms');
    let result = collection.insertOne(req.body);
    res.json('updated');

})

//update (Put)
app.put('/log_reg_forms', async(req,res)=>{
    const db = await connectToDatabase();
    const collection = db.collection('log_reg_forms');
    let singleData = await collection.updateOne({name:'John Kumar'}, {$set:{name:'Stella Johnson',age:40}})
})

//delete
app.delete('/log_reg_forms/:name', async(req,res)=>{
    const db = await connectToDatabase();
    const collection = db.collection('log_reg_forms');
    const userName = req.params.name;
    collection.deleteOne({name:userName});
    res.send('Deleted');
})

app.listen(3000);


