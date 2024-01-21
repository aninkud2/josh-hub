const express=require('express')
require('dotenv').config();
const http=require('http');
const socket=require("socket.io")
const port = 9824
const app = express()
const server=http.createServer(app)
const io=socket(server)

const messageHistory = [];

app.set("view engine","ejs")


app.get("/",(req,res)=>{

    res.render("homepage", { messageHistory })
})

io.on("connection",(socket)=>{

    socket.broadcast.emit('message history', messageHistory);

   socket.on("message", (data) => {
    messageHistory.push(data);
    socket.broadcast.emit("message",data)
   })
})


server.listen(port, () => {

console.log("Server up and running on port: "+port)

})