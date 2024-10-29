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
        error: error + ", controller getoneBook"
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
  console.log(bookObject)
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
  Book.findOne({_id: req.params.id})
    .then((book) =>{
      const newRating = req.body
      const actualRatings = book.ratings
      const found = actualRatings.find((element) => element === req.body.userId)
      if(found === newRating){
        res.status(403).json({message: 'Vous avez déjà noté ce livre'})
      }else{
        console.log('vous pouvez noter ce livre')
        book.ratings.push(
          {userId: req.body.userId,
          grade: req.body.rating,}
        )
        // au dessus, ok


        // console.log(...req.body)
        // console.log(book.ratings)
        let NewAverageRating = 0
        // console.log(book.ratings[0].grade)
        // console.log(typeof book.ratings)
        let size = Object.keys(book.ratings).length
        // console.log(size)

        for(let i =0; i<size; i++){
          // list = list.push(book.ratings[i].grade)
          NewAverageRating += book.ratings[i].grade
        }
        NewAverageRating = NewAverageRating/ size
        // console.log(NewAverageRating)
        // book.save()
        // console.log('1')

        // Book.updateOne({_id: req.params.id}, {...bookObject, averageRating: NewAverageRating})
        //   .then(() =>{
        //     console.log('2')
        //     console.log(book)
        //   })
        //   .catch((error) =>{
        //     res.status(500).json({error: error + ', erreur dans le calcul'})
        //   })
      }
    })
    .catch((error) =>{
      res.status(500).json({error: error + ', erreur dans la notation'})
    })
}







exports.bestrating = (req, res, next) => {
  console.log('bestrating')
  console.log(Book)
  
  Book.find().then(
    (book) => {
      let sortBook = book.sort((a, b) => {
        return(b.averageRating - a.averageRating)
      })
      let bestBook = sortBook.slice(0,3) // pourquoi que 3 entrées et pas 4 ?
      res.status(200).json(bestBook)
  })
  .catch((error) => {
    res.status(400).json({
      error: error + `, controller, bestrating`
    })
  })
}