const express = require('express');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://curious1972:testing123@cluster0.t59jn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(uri);

const bookSchema = new mongoose.Schema({
    title:String,
    author:String
});

const Books = mongoose.model('Book',bookSchema);

//create express app
const app = express();

//get
app.get('/books',async(req,res)=>{
    try{
        const books = await Books.find();
        res.json(books)
    }
    catch(err){
        res.status(500).json({error:'Internal Server Error'});
    }
})

//Middleware
app.use(express.json())

//post
app.post('/books',async(req,res)=>{
    console.log(req.body);
    try{
        const {title,author} = req.body;
        const newBook = new Books({title,author});
        await newBook.save();
        res.status(201).json(newBook);
    }
    catch(err){

    }
})

//put
app.put('/books/:id',async(req,res)=>{
    console.log(req.params);
    const {id} = req.params;
    const {title,author} = req.body;
    const updatedBook = await Books.findByIdAndUpdate(id,{title,author});
    res.json(updatedBook);
})

//delete
app.delete('/books/:id',async(req,res)=>{
    const {id} = req.params;
    await Books.findByIdAndRemove(id);
    res.sendStatus(204);
})

app.listen(3000,()=>{
    console.log('Server running on port 3000')
});
