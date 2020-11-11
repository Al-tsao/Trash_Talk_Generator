/* require related modules used in project */
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const generateTrashTalk = require('./trash_talk_generator.js')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

// register helper
handlebars.registerHelper('ifEqual', function (job, targetJob, options) {
  if (job === targetJob) {
    return options.fn(this)
  }
  return options.inverse(this)
})

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const options = req.body
  const trashTalk = generateTrashTalk(options.customRadio)
  res.render('index', { options: options, trashTalk: trashTalk })
})

app.listen(port, () => {
  console.log('Project Go Live')
})