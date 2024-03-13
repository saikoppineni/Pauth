const express=require('express');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const { urlencoded } = require('body-parser');
const pg=require('pg');
const bcrypt=require('bcrypt');

const app=express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

const db=new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"Auth",
    password:"satyanarayana=3",
    port:5432
});
db.connect();

app.get('/',(req,res)=>{
    res.render("home");
});

app.get('/login',(req,res)=>{
    res.render("login");
});

app.get('/register',(req,res)=>{
    res.render("register");
});

app.post("/register",async(req,res)=>{
        var name=req.body.username;
        var pass=req.body.password;
        var pass1 = await bcrypt.hash(pass,10)
        console.log(pass1)
        db.query(`insert into users1 values('${name}','${pass1}')`)
        res.render("secrets")
})

app.post("/login",async(req,res)=>{
    const name=req.body.username;
    const pass=req.body.password;
    const t=await db.query(`select * from users1 where username='${name}'`);
    const v=await bcrypt.compare(pass,t.rows[0].pass);
    console.log(v);
    if(v)
    res.render("secrets");
})

app.listen(3000,()=>{
    console.log("running in server 3000");
})