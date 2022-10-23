const express = require('express')
const URL = require('../models/URL')
const root = require('./modules/root')
const shortenURL = require('./modules/shortenURL')

const router = express.Router()

//root directory (home page)
router.use('/', root)

//shortenURL
router.use('/shortenURL', shortenURL)

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