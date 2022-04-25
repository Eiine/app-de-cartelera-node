const jwt=require("jsonwebtoken")


function autorizado(req,res,next){
    let array=req.headers.cookie.search("jwt")
        
    if(!req.headers.cookie||array < 1){
        return res.status(403).redirect("/registroerr")
    }

   
    next()
}

module.exports= autorizado