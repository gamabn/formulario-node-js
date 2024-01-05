
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
//const expressValidator = require('express-validator');
//const {query, validationResult } = require('express-validator');



let app = express();

app.use(bodyParser.urlencoded( {extended:false, limit:'80mb'}));
app.use(bodyParser.json({limit:'80mb'}));
//app.use(validationResult);
//app.use(expressValidator());



consign().include('routes').include('utils').into(app);

app.listen(4000, "127.0.0.1" ,()=>{
  
 console.log("Servidor esta rodando!");

});

//=====================================================
//let routesIndex = require("./routes/index");
//let routesUser = require('./routes/users');
//===========================================================


//app.use(routesIndex);
//app.use('/users',routesUser);

//=============SERVIDOR SEM ROUTES====================
//app.get('/', (req,res)=>{

 // res.statusCode = 200;
 // res.setHeader("Content-type", "text/hml");
 // res.end('<h1>Ola</h1>');
//});

///app.get('/users',(req,res)=>{

 // res.statusCode = 200;
 // res.setHeader("Content-type", "application/json");
 //  res.json({
       // users:[{
        //  name: 'Flavio Gama',
         //  email: "lanbinho@gmail",
         // id:1

      // }]

  // });
     
//});
//====================SERVIDOR SEM ROUTES=======================================
