const express = require('express')
const auth = require('../middleware/auth')
const stuffCtrl = require('../controllers/stuff')
const multer = require('../middleware/multer-config')

const router = express.Router()

router.get('/', stuffCtrl.getAllBook)
router.get('/bestrating', stuffCtrl.bestrating) // renvoie les 3 livres les mieux notés.
router.get('/:id', stuffCtrl.getOneBook)
router.post('/', auth, multer, stuffCtrl.createBook)
router.put('/:id', auth, multer, stuffCtrl.modifyBook)
router.delete('/:id', auth, stuffCtrl.deleteBook)
router.post('/:id/rating', auth, stuffCtrl.addRating) // sert a noter les bouquins d'un autre user



module.exports = router