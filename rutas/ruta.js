const express=require("express")

const route=express.Router()
const mysql=require ("mysql")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const autorizado=require("../seguridad/autenticar")

//rutas e interaccion usuario
route.get("/",(req,res)=>{
  res.render("index")
})

route.get("/registroG",autorizado,(req,res)=>{
  res.render("registroG")
})

route.get("/noticias",autorizado,(req,res)=>{
  res.render("noticias")
})

route.get("/cartelera", (req,res)=>{
   req.getConnection(async(err,conn)=>{
    if(err) return res.send(err)

    await conn.query("SELECT * FROM `post-noticias`",(err,users)=>{
      if(err) return res.send(err)
      
      res.render("cartelera",{
        data:users
      })
    })
  })
  
})

route.get("/carteleraG",(req,res)=>{
  req.getConnection((err,conn)=>{
    if(err) return res.send(err)

    conn.query("SELECT * FROM `grupos`",(err,users)=>{
      if(err) return res.send(err)
      
      res.render("carteleraG",{
        data:users
      })
    })
  })
  
})




route.get("/login",(req,res)=>{
  res.render("login")
})

route.get("/registroerr",(req,res)=>{
  res.render("registroerr")
})
route.get("/registroG",(req,res)=>{
  res.render("registroG")
})

route.get("/registroU",(req,res)=>{
  res.render("registroU")
})

//control usuarios-------------------------------------

route.post('/login', async (req, res) => {
  try {
    const {username,pass}=req.body
    if(!username||!pass){
      res.render("registroerr")
    
    }else{
      req.getConnection((err,conn)=>{
        if(err) return res.send(err)
          const {username,pass}=req.body
          conn.query("SELECT * FROM users WHERE username=?",[username],async (err,users)=>{
          if(users.length==0|| !(await bcrypt.compare(pass, users[0].pass))){
            console.log(users[0].pass);
            console.log(pass);
            res.render("registroerr")
          }else{
            const id=users[0].id
            const token=jwt.sign({id:id},"secretkey")
            
            let cookiesOption={
              
              httpOnly:true
            }

            
                                    
            res.cookie("jwt", token, cookiesOption)
            res.redirect("/cartelera")
          }
          })
          
      })
      
      }
      
  
    
  } catch (error) {
    console.log(error);
  }

})

route.get('/api/usuarios', (req, res) => {
    req.getConnection((err,conn)=>{
      if(err) return res.send(err)

      conn.query("SELECT * FROM users",(err,users)=>{
        if(err) return res.send(err)
        
        res.send(users)      
      })
    })

  })
  
  route.post('/', async(req, res) => {
    let {name,username,pass}=req.body
    if(!name||!username||!pass){
     
      res.redirect("/registroU")
    }else{
      try {
        let {name,username,pass}=req.body
        let passhash=await bcrypt.hash(pass, 8)
        req.getConnection((err,conn)=>{
          if(err) return res.send(err)
            conn.query("INSERT INTO users set ?",{name:name,username:username,pass:passhash} ,(err,users)=>{
            if(err) return res.send(err)    
            res.redirect("/cartelera");

          });
        });
      }catch (error){
        console.log(error);

      }
    }});
  
  route.delete('/:id', (req, res) => {
    req.getConnection((err,conn)=>{
      if(err) return res.send(err)
      console.log(req.body);
      conn.query("DELETE FROM users WHERE id = ?",[req.params.id] ,(err,users)=>{
        if(err) return res.send(err)
        
        res.send("Usuario eliminado")
        
      })
    })

  })

  route.put('/:id', (req, res) => {
    req.getConnection((err,conn)=>{
      if(err) return res.send(err)
      console.log(req.params.id);
      conn.query('UPDATE users set ? WHERE id = ?',[req.body ,req.params.id] ,(err,users)=>{
        if(err) return res.send(err)
        
        res.send("usuario actulizado")
        
      })
    })

  })

//control grupos------------------------------------------------


route.get('/api/grupos', (req, res) => {
  req.getConnection((err,conn)=>{
    if(err) return res.send(err)

    conn.query("SELECT * FROM grupos",(err,users)=>{
      if(err) return res.send(err)
      console.log(users);
      if(err) return res.send(err)
        res.send(users)
      })
    })
  })



route.post('/grupos', (req, res) => {
    const data=req.body;
  req.getConnection((err,conn)=>{
    if(err) return res.send(err)
    
    conn.query("INSERT INTO grupos set ?",[data] ,(err,users)=>{
      const data=req.body;
      
      if(err) return res.send(err)
        res.redirect("/cartelera")
      
    })
  })

})

route.delete('/grupos/:id', (req, res) => {
  
  req.getConnection((err,conn)=>{
    if(err) return res.send(err)
    console.log(req.params.id);
    conn.query('DELETE FROM grupos WHERE id = ?',[req.params.id] ,(err,users)=>{
      if(err) return res.send(err)
      
      res.send("grupo eliminado")
      
    })
  })

})

route.put('/gurpos/:id', (req, res) => {
  req.getConnection((err,conn)=>{
    if(err) return res.send(err)
    console.log(req.params.id);
    conn.query('UPDATE grupos set ? WHERE id = ?',[req.body ,req.params.id] ,(err,users)=>{
      if(err) return res.send(err)
      
      res.send("grupo actulizado")
      
    })
  })

})
//---------------posteo de noticias---------------------------

route.get('/api/vnoticias', (req, res) => {
  req.getConnection((err,conn)=>{
    if(err) return res.send(err)

    conn.query("SELECT * FROM `post-noticias`",(err,users)=>{
      if(err) return res.send(err)
      
      if(err) return res.send(err)
        res.send(users)
      })
    })
  })
route.post('/noticias', (req, res) => {
  const data=req.body;
req.getConnection((err,conn)=>{
  if(err) return res.send(err)
  
  conn.query("INSERT INTO `post-noticias` set ?",[data] ,(err,users)=>{
    const data=req.body;
    
    if(err) return res.send(err)
      res.redirect("/cartelera")
    
  })
})

})

route.delete('/noticias/:id', (req, res) => {
  
  req.getConnection((err,conn)=>{
    if(err) return res.send(err)
    console.log(req.params.id);
    conn.query('DELETE FROM `post-noticias` WHERE id = ?',[req.params.id] ,(err,users)=>{
      if(err) return res.send(err)
      
      res.send("grupo eliminado")
      
    })
  })

})



module.exports = route ;
