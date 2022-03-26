const express=require("express")
const route=express.Router()
const mysql=require ("mysql")

//rutas e interaccion usuario
route.get("/",(req,res)=>{
  res.render("index")
})
route.get("/registroG",(req,res)=>{
  res.render("registroG")
})

route.get("/cartelera",(req,res)=>{
  res.render("cartelera")
})

route.get("/registroG",(req,res)=>{
  res.render("registroG")
})


route.get("/registroU",(req,res)=>{
  res.render("registroU")
})
//control usuarios-------------------------------------

route.get('/', (req, res) => {
    req.getConnection((err,conn)=>{
      if(err) return res.send(err)

      conn.query("SELECT * FROM users",(err,users)=>{
        if(err) return res.send(err)
        
        res.json(users)
        
      })
    })

  })
  
  route.post('/', (req, res) => {
    req.getConnection((err,conn)=>{
      if(err) return res.send(err)
      console.log(req.body);
      conn.query("INSERT INTO users set ?",[req.body] ,(err,users)=>{
        if(err) return res.send(err)
        
        res.send("Usuario creado")
        
      })
    })

  })

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

  route.put('/grupos/:id', (req, res) => {
    req.getConnection((err,conn)=>{
      if(err) return res.send(err)
      console.log(req.params.id);
      conn.query('UPDATE grupos set ? WHERE id = ?',[req.body ,req.params.id] ,(err,users)=>{
        if(err) return res.send(err)
        
        res.send("usuario actulizado")
        
      })
    })

  })

//control grupos------------------------------------------------


route.get('/grupos', (req, res) => {
  req.getConnection((err,conn)=>{
    if(err) return res.send(err)

    conn.query("SELECT * FROM grupos",(err,users)=>{
      if(err) return res.send(err)
      
      res.json(users)
      
    })
  })

})

route.post('/grupos', (req, res) => {
  req.getConnection((err,conn)=>{
    if(err) return res.send(err)
    console.log(req.body);
    conn.query("INSERT INTO grupos set ?",[req.body] ,(err,users)=>{
      if(err) return res.send(err)
      
      res.send("grupo creado")
      
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


module.exports = route ;