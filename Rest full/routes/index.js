//let express = require('express');
//let routes = express.Router();

//routes.get('/', (req,res)=>{

   // res.statusCode = 200;
   // res.setHeader("Content-type", "text/hml");
   // res.end('<h1>Ola</h1>');
  //});

 // module.exports = routes;

 module.exports = (app)=>{

  app.get('/', (req,res)=>{

     res.statusCode = 200;
     res.setHeader("Content-type", "text/hml");
     res.end('<h1>Ola</h1>');
     
   });
 }