const express = require('express')
const router = express.Router()

//homepage
router.get('/', (req, res) => {
  res.render('index')
})


module.exports = router