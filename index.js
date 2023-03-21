const express = require('express')
const app = express()
const port = 3000
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require('body-parser')

const DATABASE_URL = "mongodb+srv://Ollko:Ollko0323@alex.nwv91uy.mongodb.net/?retryWrites=true&w=majority"

const indexRouter = require("./routes/index")
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false })) // add to notion

const mongoose = require('mongoose')
// mongoose.set("strictQuery", false);
mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use("/", indexRouter)
app.listen(process.env.PORT || port)

