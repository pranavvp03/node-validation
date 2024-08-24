const express = require("express");
const app = express();
const hbs = require("hbs");
const nocache = require("nocache")
const session = require("express-session");
const serverusername = "pranav";
const serverpassword = "pranav12345";
app.set("view engine", "hbs");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("views"));
app.use(nocache())

app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


app.get('/', (req,res)=>{
   if (req.session.user) {
    res.render("home");
   }else{
    res.render('login');
   }

    
    
});   

app.post('/home',(req,res)=>{
    
    if (req.body.username===serverusername && req.body.password===serverpassword) {
        req.session.user=req.body.username;
        res.render('home')
    }else{
       res.render("login",{msg:"correct your datas"})
    }
});

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})



const PORT = 3001;

app.listen(PORT, ()=>console.log(`server is running on ${PORT}`));