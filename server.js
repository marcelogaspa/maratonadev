//server constructor
const express = require("express")
const server =express()

//requesting extra files
server.use(express.static('public'))

//enabling body form
server.use(express.urlencoded({extended: true}))

const Pool = require('pg').Pool
const db = new Pool ({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'bancodesangue'
    })

//template engineer 
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})


//index display
server.get("/", function(req, res){
   db.query("select * from donors", function(err, result) {
       if(err) return res.send("Database Error")
       
       const donors = result.rows
       return res.render("index.html", { donors })
   })
    
})

server.post("/", function(req, res) {
  const name = req.body.name
  const email = req.body.email
  const blood = req.body.blood

  if (name == "" || email == "" || blood == "") {
      return res.send("you need to fill in all the fields")
  }

  const query = `INSERT INTO donors("name","email","blood") 
  VALUES ($1, $2, $3)`

  const values = [name, email, blood]
  
  db.query(query, values, function(err) {
      if(err) return res.send("Database error")

      return res.redirect("/")

  })    
})

server.listen(5050, function() {
    console.log("server started")
})
