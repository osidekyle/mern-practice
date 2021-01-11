const express=require("express")
const dotenv=require("dotenv")
const morgan = require("morgan")
const exphbs=require("express-handlebars")
const passport=require("passport")
const session=require("express-session")
const connectDB=require("./config/db.js")
const path=require("path")
//Load config file
dotenv.config({path: "./config/config.env"})


//Passport config
require('./config/passport')(passport)


connectDB()

const app=express()

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}


//Handlebars
app.engine(".hbs",exphbs({defaultLayout:"main",extname:".hbs"}))
app.set("view engine", ".hbs")

//Sesion middleware
app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:false,
}))


//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Static
app.use(express.static(path.join(__dirname,"public")))

//Routes
app.use('/',require("./routes/index.js"))


const PORT=process.env.PORT || 5000



app.listen(PORT,console.log("Listening on port "+PORT+" in "+process.env.NODE_ENV+" mode."))