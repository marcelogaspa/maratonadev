//server constructor
const express = require("express")
const server =express()

//requesting extra files
server.use(express.static('public'))


//template engineer 
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server
})

//index display
server.get("/", function(req, res){
    return res.render("index.html")

})

server.listen(5050, function() {
    console.log("server started")
})

