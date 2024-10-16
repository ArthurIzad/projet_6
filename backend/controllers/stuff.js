const Book = require('../models/Book')
const fs = require('fs')

// exports.createBook = (req, res, next) => {
//   const book = new Book({
//     title: req.body.title,
//     author: req.body.author,
//     year: req.body.year,
//     genre: req.body.genre,
//     note: req.body.note,
//     userId: req.body.userId,
//     imageUrl: req.body.imageUrl

//   })
//   book.save().then(
//     () => {
//       res.status(201).json({
//         message: 'Post saved successfully!'
//       })
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       })
//     }
//   )
// }

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book)
  console.log(req.body)

  delete bookObject._id
  delete bookObject._userId
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  

  book.save()
    .then(() => {res.status(201).json({message : "livre enregistré"})})
    .catch((error) => res.status(400).json({error : error + ` échec dans la création du livre`}))
}

exports.getOneBook = (req, res, next) => {
    Book.findOne({
        _id: req.params.id
    }).then(
    (book) => {
      res.status(200).json(book)
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      })
    }
  )
}

// exports.modifyBook = (req, res, next) => {
//   const book = new Book({
//     _id: req.params.id,
//     title: req.body.title,
//     description: req.body.description,
//     imageUrl: req.body.imageUrl,
//     price: req.body.price,
//     userId: req.body.userId
//   })
//   Book.updateOne({_id: req.params.id}, book)
//     .then(() => {
//       res.status(201).json({
//         message: 'Book updated successfully!'
//       })
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error
//       })
//     })
// }

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images${req.file.filename}`
  } : {...req.body}

  delete bookObject._userId
  Book.findOne({_id: req.params.id})
    .then((book) =>{
      if (book.userId != req.auth.userId){
        res.status(401).json({message: 'Non autorisé !'})
      }else{
        Book.updateOne({_id: req.params.id}, {...bookObject, _id: req.params.id})
          .then(() => res.status(200).json({message: 'Objet modifié !'}))
          .catch(error => res.status(401).json({error}))
      }
    })
    .catch((error) => {
      res.status(400).json({error})
    })
}

// exports.deleteBook = (req, res, next) => {
//     Book.deleteOne({_id: req.params.id}).then(
//     () => {
//       res.status(200).json({message: 'Deleted!'})
//     })
//   .catch((error) => {
//     res.status(400).json({
//       error: error
//     })
//   })
// }

exports.deleteBook = (req, res, next) => {
  Book.findOne({_id: req.params.id})
    .then(book =>{
      if (book.userId != req.auth.userId){
        res.status(401).json({message : 'Non autorisé !!'})
      }else{
        const filename = book.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () =>{
          Book.deleteOne({_id: req.params.id})
            .then(() => {res.status(200).json({message: 'Objet supprimé !'})})
            .catch(error => res.status(401).json({error}))
        })
      }
    })
    .catch( error => {
      res.status(500).json({error})
    })
}

exports.getAllStuff = (req, res, next) => {
    Book.find().then(
    (books) => {
      res.status(200).json(books)
    })
  .catch((error) => {
    res.status(400).json({
      error: error
    })
  })
}