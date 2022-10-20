const express = require('express')
const URL = require('../models/URL')


const router = express.Router()

const home = require('./modules/home')

//home page
router.use('/', home)



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