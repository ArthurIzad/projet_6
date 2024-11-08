const multer = require('multer')
const sharp = require('sharp')
const sharpMulter = require('sharp-multer')
const SharpMulter = require('sharp-multer')


const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const newNameFunction = (file, options) => {
    const removeSpace = file.split(' ').join('_')
    const newname = removeSpace.split(".").slice(0, -1).join(".") + Date.now() +"." + options.fileFormat
    return newname
}

const storage = sharpMulter({
    destination: (req, file, callback) => 
        callback(null, 'images'),
        imageOptions:{
                        fileFormat: "webp",
                        quality: 80,
                        resize: { width: 500, height: 500 },
                    },
    filename: newNameFunction
        
})

const upload  =  multer({ storage });


module.exports = multer({storage : storage}).single('image')