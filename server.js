//server constructor
const express = require("express")
const server =express()

//requesting extra files
server.use(express.static('public'))


//enabling body form
server.use(express.urlencoded({extended: true}))

//DataBase connection
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

//Array
const donors = [
    {   
        name: "Marcelo Gasparetti",
        blood: "O+"
    },
    {   
        name: "Juliana do Nascimento",
        blood: "O-"
    },
    {
        name: "Giulia Rubio Gasparetti",
        blood: "O-"
    },
    {   
        name: "Carl Marx",
        blood: "AB+"
    },
]

//index display
server.get("/", function(req, res){
    return res.render("index.html", { donors })
})

server.post("/", function(req, res) {
  const name = req.body.name
  const email = req.body.email
  const blood = req.body.blood

  //add new values to array donors
  donors.push({
      name: name,
      blood: blood,
    })
    return res.redirect("/")
})



server.listen(5050, function() {
    console.log("server started")
})
