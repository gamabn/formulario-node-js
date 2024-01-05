module.esports = {

    send: (err,req,res, code = 400)=>{
        
        console.log(`error: ${err}`);
        res.status(code).jon({
          error:err

        });
    }
}