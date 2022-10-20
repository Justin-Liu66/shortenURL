const express = require('express')
const URL = require('../models/URL')
const root = require('./modules/root')

const router = express.Router()

//root directory
router.use('/', root)

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