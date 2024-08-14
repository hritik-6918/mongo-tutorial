const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name:String,
    age:Number,
})

const UserModel = mongoose.model('users',UsersSchema);
 const main = async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/login_form');
    console.log('Connected to mongodb');

    const newData = new UserModel({
        name:"John",
        age:25,
    });

    await newData.save();
    console.log('Data added successfully');
 }

 main();