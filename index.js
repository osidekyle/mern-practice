const express=require("express")
const dotenv=require("dotenv")
const morgan = require("morgan")
const exphbs=require("express-handlebars")
const connectDB=require("./config/db.js")
const path=require("path")
//Load config file
dotenv.config({path: "./config/config.env"})

//connectDB()

const app=express()

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}


//Handlebars
app.engine(".hbs",exphbs({defaultLayout:"main",extname:".hbs"}))
app.set("view engine", ".hbs")


//Static
app.use(express.static(path.join(__dirname,"public")))

//Routes
app.use('/',require("./routes/index.js"))


const PORT=process.env.PORT || 5000



app.listen(PORT,console.log("Listening on port "+PORT+" in "+process.env.NODE_ENV+" mode."))