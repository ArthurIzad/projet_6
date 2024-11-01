const express = require('express')
const auth = require('../middleware/auth')
const bookCtrl = require('../controllers/book')
const multer = require('../middleware/multer-config')

const router = express.Router()

router.get('/', bookCtrl.getAllBook) // renvoie tous les livres de la base de donnée
router.get('/bestrating', bookCtrl.bestrating) // renvoie les 3 livres les mieux notés.
router.get('/:id', bookCtrl.getOneBook)
router.post('/', auth, multer, bookCtrl.createBook)
router.put('/:id', auth, multer, bookCtrl.modifyBook)
router.delete('/:id', auth, bookCtrl.deleteBook)
router.post('/:id/rating', auth, bookCtrl.addRating) // sert a noter les bouquins d'un autre user

module.exports = router