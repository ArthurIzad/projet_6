const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')

mongoose.connect("mongodb+srv://arthurizad:Wasabi56100!@cluster0.z1ltn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('connexion à mongodb réussie'))
  .catch(() => console.log('connexion a mongodb echouée'))
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})



app.use(bodyParser.json())
app.use(express.json())


app.use('/api/books', stuffRoutes)
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app