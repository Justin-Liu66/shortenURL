const express = require('express')
const router = express.Router()

const URL = require('../models/URL')
const shortURL = require('../generate_shortURL')

//homepage
router.get('/', (req, res) => {
  res.render('index')
})

//CREATE
router.post('/shortenURL', (req, res) => {

  const inputURL = req.body.initURL

  if (!inputURL) {
    return res.redirect('/')
  }

  URL.findOne({ initURL: inputURL })
    .lean()
    .then((data) => {

      //if the input URL has been shortened before
      if (data) {

        res.render('index', { data, inputURL, origin: req.headers.origin, shortURL: data.shortURL })

        //if never been shortened before
      } else {
        const randomShortURL = shortURL(5)
        //未來優化方向
        //需檢查新產生的shortURL是否與database中的重複
        URL.create({ initURL: inputURL, shortURL: randomShortURL })
          .then(
            res.render('index', { inputURL, origin: req.headers.origin, randomShortURL })
          )
      }
    })
    .catch(error => console.log(error))
})

//redirect 
router.get("/:inputShortURL", (req, res) => {
  //debug 3: console.log(req) > 裡面會有三個params
  const shortURL = req.params.inputShortURL
  //debug 2: console.log(shortURL) > shortURL, initURL, favicon.ico
  return URL.findOne({ shortURL })

    .lean()
    .then(data => {
      //debug 1: console.log(data) > 出現三筆data
      if (!data) {
        res.send("oops! can not find the url")

        //bug: 導不過去initURL(原始網站)
      } else {
        res.redirect(data.initURL)
      }
    })
    .catch(error => console.log(error))

})


module.exports = router