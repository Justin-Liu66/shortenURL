const express = require('express')
const URL = require('../models/URL')
const shortURL = require('../utils/generate_shortURL')

const router = express.Router()

const home = require('./modules/home')

router.use('/', home)

//CREATE
router.post('/shortenURL', (req, res) => {

  const inputURL = req.body.initURL

  //input驗證: 當輸入input的網址不含https等protocal則顯示提醒字樣(包含使用者未輸入任何字就按下按钮的情況)
  const obj = require('url').parse(inputURL)
  const urlProtocol = obj.protocol
  if (!urlProtocol) {
    res.render('index', { obj, inputURL })
    return
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

  const shortURL = req.params.inputShortURL

  return URL.findOne({ shortURL })

    .lean()
    .then(data => {

      if (!data) {
        res.render("error", { host: req.headers.host, shortURL })
      } else {
        res.redirect(data.initURL)
      }
    })
    .catch(error => console.log(error))

})


module.exports = router