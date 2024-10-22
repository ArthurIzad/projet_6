const express = require('express')
const auth = require('../middleware/auth')
const stuffCtrl = require('../controllers/stuff')
const multer = require('../middleware/multer-config')

const router = express.Router()


router.get('/', stuffCtrl.getAllBook)
router.get('/:id', stuffCtrl.getOneBook)
// router.get('/bestrating', stuffCtrl.XXXXXXXXX) <- renvoie les 3 livres les mieux notés.
router.post('/', auth, multer, stuffCtrl.createBook)
router.put('/:id', auth, multer, stuffCtrl.modifyBook)
router.delete('/:id', auth, stuffCtrl.deleteBook)

router.post('/:id/rating', auth, stuffCtrl.addRating) // sert a noter les bouquins d'un autre user



module.exports = router