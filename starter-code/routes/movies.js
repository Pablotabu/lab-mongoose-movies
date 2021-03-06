

const express = require('express');
const router  = express.Router();
const Movie = require('../models/Movie.js')

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(movies =>{
        console.log(movies)
      res.render('./movies/index', {movies})
    })
    .catch(err =>{
        console.log(err)
    })
  } )

  router.get('/movies/:id',(req, res, next) => {
      let movieId = req.params.id;
      Movie.findOne({"_id": movieId})
      .then(movie => {
          //console.log('movie')
          res.render('movies/show', movie)
      })
      .catch(err => {
          console.log(err)
      })
  })

  router.get('/new2', (req, res, next) => {
    res.render("movies/new2")
  });

  router.post('/new2', (req, res) => {
    const {title, genre, plot} = req.body;
    const movie = new Movie ({title, genre, plot});
    movie.save( err => {
      if (err) { return next(err) }
      res.redirect('/movies');
    })
  });


router.post("/movies/:id/delete", (req, res, next) => {
    let movieId = req.params.id;
     Movie.findOneAndRemove({"_id": movieId})
     //console.log('paco')
      .then(() => {
          //console.log('paco')
        res.redirect("/movies");
      })
      .catch(next);
  });


router.get('/movies/edit/:id', (req, res, next) => {
    let movieId = req.params.id;
    Movie.findOne({'_id': movieId})
    .then(movie => {
        res.render("movies/edit", movie)
    })
    .catch((error) => {
        console.log(error)
      })
  });


  router.post('/movies/:id', (req, res, next) => {
    const { title, genre, plot} = req.body;
    Movie.findOneAndUpdate ({'_id': req.params.id}, { $set: { title, genre,plot }})
    .then(() => {
      res.redirect("/movies")
    })
   
    .catch(next)
  });







  




module.exports = router;