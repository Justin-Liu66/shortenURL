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

  //bug: 將前端表單驗證取消來驗證此功能，發現導不回去首頁
  if (!inputURL) {
    return redirect('/')
  }

  URL.findOne({ initURL: inputURL })
    .lean()
    .then((data) => {

      //if the input URL has been shortened before
      if (data) {

        res.render('success', { data, inputURL, origin: req.headers.origin, shortURL: data.shortURL })

        //if never been shortened before
      } else {
        const randomShortURL = shortURL(5)
        //未來優化方向
        //需檢查新產生的shortURL是否與database中的重複
        URL.create({ initURL: inputURL, shortURL: randomShortURL })
          .then(
            res.render('success', { inputURL, origin: req.headers.origin, randomShortURL })
          )
      }
    })
    .catch(error => console.log(error))
})

//redirect 
router.get('/:inputShortURL', (req, res) => {

  const { shortURL } = req.params

  return URL.findOne({ shortURL })

    .lean()
    .then(data => {

      if (!data) {
        res.send("oops! can not find the url")

        //bug: 導不過去initURL(原始網站)
      } else { res.redirect(data.initURL) }
    })
    .catch(error => console.log(error))

})


module.exports = router