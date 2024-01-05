//=================USANDO O ROUTES======================
//let express = require('express');
//let routesUser = express.Router();

//routesUser.get('/',(req,res)=>{

   // res.statusCode = 200;
   // res.setHeader("Content-type", "application/json");
    // res.json({
        //  users:[{
         //   name: 'Flavio Gama',
          //   email: "lanbinho@gmail",
          //  id:1
  
        // }]
  
    // });
       
 // });

//routesUser.get('/admin', (req, res)=>{

  //res.statusCode = 200;
  //res.setHeader("Content-type", "application/json");
  // res.json({
       // users:[{  
       //   telefone:'21 97028082',
       // }
       // ]

  // });
     
//});

///  module.exports = routesUser;
//============USANDO O ROUTES==========================
let NeDB = require('nedb');
let db = new NeDB({
  filename:'users.db',
  autoload: true
})
const {body,validationResult  } = require('express-validator')
 module.exports = (app)=>{

    let route = app.route('/users');
    route.get((req,res)=> {
   // app.get('/users',(req,res)=>{

      db.find({}).sort({name:1}).exec((err, users)=>{

        if(err){

          app.utils.error.send(err, req, res);

          } else {
            res.statusCode = 200;
            res.setHeader("Content-type", "application/json");
             res.json({
                  users 
                 // users: users
          
             });

          }

        });

      });

  route.post((req, res)=>{

    //if (!app.utils.validator.user(app, req, res)) return false;
        
        db.insert(req.body, (err, user)=>{

            if (err) {
                app.utils.error.send(err, req, res);
            } else {

                res.status(200).json(user);

            }

        });
   
    }) ;

  
let routeId = app.route('/users/:id');
routeId.get((req, res) =>{
   
  db.findOne({_id:req.params.id}).exec((err, user)=>{

    if(err){

      app.utils.error.send(err, req, res);

    }else{

      res.status(200).json(user);

       }
     
  });
});


routeId.put((req, res) =>{
   
  db.update({ _id: req.params.id}, req.body, err=>{ 

    if(err){

      app.utils.error.send(err, req, res);

    }else{

     res.status(200).json(Object.assign(req.params, req.body));

       }
     
  });

});
routeId.delete((req, res) =>{
   
  db.remove({ _id: req.params.id}, {}, err=>{ 

    if(err){

      app.utils.error.send(err, req, res);

    }else{

     res.status(200).json(req.params);

       }
     
  });

});

}
