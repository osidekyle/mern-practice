const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const morgan = require("morgan")
const exphbs=require("express-handlebars")
const methodOverride = require("method-override")
const passport=require("passport")
const session=require("express-session")
const MongoStore=require("connect-mongo")(session)
const connectDB=require("./config/db.js")
const path=require("path")
//Load config file
dotenv.config({path: "./config/config.env"})


//Passport config
require('./config/passport')(passport)


connectDB()

const app=express()

//Body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Method override
app.use(methodOverride(function (req,res){
    if(req.body && typeof req.body==="object" && "_method" in req.body){
        var method=req.body._method
        delete req.body._method
        return method
    }
}))

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

//Hbs Helpers
const {formatDate,truncate,stripTags,editIcon,select}=require("./helpers/hbs")


//Handlebars
app.engine(".hbs",exphbs({helpers:{formatDate,editIcon, truncate,stripTags,select},defaultLayout:"main",extname:".hbs"}))
app.set("view engine", ".hbs")

//Sesion middleware
app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:false,
    store:new MongoStore({
        mongooseConnection: mongoose.connection
    })
}))


//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Set global variable
app.use(function (req,res,next){
    res.locals.user=req.user || null
    next()
})

//Static
app.use(express.static(path.join(__dirname,"public")))

//Routes
app.use('/',require("./routes/index.js"))
app.use('/auth',require("./routes/auth"))
app.use('/stories',require("./routes/newStories"))


const PORT=process.env.PORT || 5000



app.listen(PORT,console.log("Listening on port "+PORT+" in "+process.env.NODE_ENV+" mode."))