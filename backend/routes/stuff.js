const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const stuffCtrl = require('../controllers/stuff')
const multer = require('../middleware/multer-config')

router.get('/', stuffCtrl.getAllStuff)
router.post('/', auth, multer, stuffCtrl.createBook)
router.get('/:id', auth, stuffCtrl.getOneBook)
router.put('/:id', auth, multer, stuffCtrl.modifyBook)
router.delete('/:id', auth, stuffCtrl.deleteBook)


module.exports = router