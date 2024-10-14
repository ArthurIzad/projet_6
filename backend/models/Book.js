const mongoose = require('mongoose')

// const bookSchema = mongoose.Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   year: {type: Number, required: true},
//   genre: {type: String, required: true},
//   rating: {type: Number, required: true},
//   // rating: {
//   //   userID: String,
//   //   grade: Number,
//   //   required: true
//   // },
//   imageUrl: { type: String, required: true },
// })

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: {type: Number, required: true},
  genre: {type: String, required: true},
  rating: [{type: Number, type:String, required: true}],
  // rating: {
  //   userID: String,
  //   grade: Number,
  //   required: true
  // },
  averageRating: {type: Number},
  imageUrl: { type: String, required: true },
})

module.exports = mongoose.model('Book', bookSchema)