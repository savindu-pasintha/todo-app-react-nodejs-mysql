var express = require('express')
var createError = require('http-errors')
var path = require('path')
var cookieParser = require('cookie-parser')
var cors = require('cors')

//Here You Can Import All The Http EndPoint Source File Inside The Route Folder
var indexRouter = require('./routes/index')
var jiraboardRouter = require('./routes/jiraboard')

// View Engine Setup
var app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.json())
app.use(
  express.urlencoded({ extended: false }),
) /**extended: true  =   content type :  form-data not support*   raw , x-ww-form-urlencodel support*/
app.use(cors({ origin: 'http://localhost:3000' }))
//app.use(logger('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//Here You Can Define All The Https/Http Endpoints
app.use('/', indexRouter)
app.use('/jiraboar', jiraboardRouter) //http://localhost:5000/jiraboard/tickets

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
