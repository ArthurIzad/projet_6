const Book = require('../models/Book')
const fs = require('fs')


exports.createBook = (req, res, next) => {
  console.log("createbook")
  const bookObject = JSON.parse(req.body.book)
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
  console.log("getonebook")
  Book.findOne({_id: req.params.id})
  .then(
    (book) => {
      res.status(200).json(book)
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error + `, controller, get one book`
      })
    }
  )
}




exports.modifyBook = (req, res, next) => {
  console.log("modify")
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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


exports.deleteBook = (req, res, next) => {
  console.log("delete")

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

exports.getAllBook = (req, res, next) => {
  console.log("getallbook")

  Book.find().then(
    (books) => {
      res.status(200).json(books)
  })
  .catch((error) => {
    res.status(400).json({
      error: error + `, controller, get all book`
    })
  })
}


exports.addRating = (req, res, next) => {
  console.log('addRating')
  // console.log(req.body )
  // console.log('userid et rating de la personne connecté')

  // console.log(req.params )
  // console.log('id du bouquin')

  // console.log(req.params.id)


  Book.findOne({_id: req.params.id})
    .then((book) =>{
      // console.log(book)
      const newRating = req.body.rating
      console.log(newRating)

      console.log(book.ratings)
    })
    .catch((error) =>{
      res.status(200).json({error: error + ', erreur dans la notation'})
    })


}
