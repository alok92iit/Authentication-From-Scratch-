const express =require("express")
const app =express()
const myroute =require("./routes/routes")
const path =require("path")
const mongoose =require("mongoose")
const session =require("express-session")



mongoose.connect('mongodb://localhost:27017/userAuthentication')
.then(()=>console.log("Database connected"))

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'views')));
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
const sessionConfig ={
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}
app.use(session(sessionConfig));

app.use(myroute);


app.listen(4040,()=>{
    console.log("Server is runing at port 4040")
})