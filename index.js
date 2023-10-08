const express = require('express');
const axios = require('axios')

const todosdoc = require('./models/todosdoc')

const app = express();
require('dotenv').config();

const mongoose = require('mongoose');

app.use(express.json());

app.get('/uploaddata',async (req,res)=>{

    try {
        let response =await fetch('https://jsonplaceholder.typicode.com/todos');

        let data =await response.json();

        for(let i=0;i<data.length;i++)
       {
          let tempobj = new todosdoc(data[i]);

          await tempobj.save();
       }
           
        console.log(data)

        res.status(201).send({
            status:201,
            message:"Uploaded"
        })

    }
    catch(error) {
        console.log(error);
        res.status(400).send({
            status:400,
            message:"Upload failed"
        })
    }

})


app.get('/gettodos:pageno',async (req,res)=>{
   
    try {

        let temppage = req.params.pageno;

        
        let pageno1 = temppage.split(":");
        let pageno = parseInt(pageno1[1]);
        
        console.log(temppage,typeof temppage,pageno)

        // console.log(pageno.split(":"))

       let tempdataarray =await todosdoc.find({}).skip(pageno*10).limit(10);

    //    console.log(tempdataarray)

    //    let dataarray = [];

    //    for(let i=((pageno-1)*10);i<=((pageno*10)-1);i++)
    //    {
    //         dataarray.push(tempdataarray[i]);
    //    }

        res.status(200).send({
            status:200,
            message:"Success get data",
            dataarrayans : tempdataarray,
        })

    }
    catch(error) {
        console.log(error);
        res.status(400).send({
            status:400,
            message:"Get failed"
        })
    }

})

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("MOngoDB database connected")})
.catch((error)=>{console.log("Error connecting to DB",error)})

app.listen(process.env.PORT,()=>{console.log("Server running at PORT",process.env.PORT)});