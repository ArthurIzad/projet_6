const multer = require('multer')
const sharp = require('sharp')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        console.log('multer')
        // const {buffer, originalname} = req.file
        // console.log(buffer)
        const removeSpace = file.originalname.split(' ').join('_')
        const removeExtension = removeSpace.split('.')
        let name = []
        for (let i = 0 ; i < removeExtension.length -1; i++){
            name += removeExtension[i]
        }
        // sharp(buffer)
        //     .webp({ quality: 20 })

        callback(null, name + Date.now() + '.' + `webp`)
    }
})

module.exports = multer({storage : storage}).single('image')