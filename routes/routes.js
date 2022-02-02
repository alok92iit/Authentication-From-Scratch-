const express =require("express")
const router =express.Router() ;
const User =require("../model/Users")
const bcrypt =require("bcrypt")


const requireLogin =(req,res,next)=>{
    if(!req.session.userid){    
        return res.send("You need to login first")
     }
    next()
}


router.get("/signup",(req,res)=>{
    res.render("index")
})



router.post("/signup",async (req,res)=>{
    const {username,password} =req.body;
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password,salt)
    const newUser =await User({username ,password :hash})
    await newUser.save();
    res.redirect("/login")
})

router.get("/login",(req,res)=>{
    res.render("login")
})

router.post("/login",async (req,res)=>{
    const {username,password} =req.body
    const user = await User.findOne( {username} );
   // const user = await User.findOne({ username });
   if(user){
    const validuser =await bcrypt.compare(password,user.password)
   // const validUser =  await bcrypt.compare(password,user.password) 
    if(!validuser){
            return res.send("Not a valid user")
        }
        req.session.userid= user._id     
        
   }
   res.redirect("secret") 
})

router.get("/secret",requireLogin,(req,res)=>{
   
        res.send("Thanks for watching")
})

router.get("/logout",(req,res)=>{
    if(req.session.userid){
        req.session.destroy()
        res.redirect("/login")
    }
    res.send("You not logined yet")
})


module.exports =router;