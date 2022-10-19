const express = require('express')
const exphbs = require('express-handlebars')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

//set view engine & handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//body-parser
app.use(express.urlencoded({ extended: true }))

//routes
app.use(routes)

app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})