const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')

mongoose.connect("mongodb+srv://arthurizad:Erb75dj!fj39ss?bkofH3B3!9gjHk75@cluster0.z1ltn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('connexion mongodb réussi'))
  .catch(() => console.log('connexion a mongodb echoué'))
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})



app.use(bodyParser.json())

app.use('/api/stuff', stuffRoutes)
app.use('/api/auth', userRoutes)

module.exports = app