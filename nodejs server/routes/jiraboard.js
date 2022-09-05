var express = require('express')
const puppeter = require('puppeteer')
var router = express.Router()
const { QueryExecute } = require('./mysq_database')

//Routes for jira_board_tickets
let sample_data = []
let sample_dataset = {
  todo: {
    id: 'Todo',
    list: [
      {
        id: '1',
        text: 'text1',
        title: 't1',
        description: 'd1',
        status: 's1',
      },
    ],
  },
  doing: {
    id: 'In Progress',
    list: [
      {
        id: '1',
        text: 'text1',
        title: 't1',
        description: 'd1',
        status: 's1',
      },
    ],
  },
  qa: {
    id: 'QA Ready',
    list: [
      {
        id: '1',
        text: 'text1',
        title: 't1',
        description: 'd1',
        status: 's1',
      },
    ],
  },
  done: {
    id: 1,
    list: [
      {
        id: 'Done',
        text: 'text1',
        title: 't1',
        description: 'd1',
        status: 's1',
      },
    ],
  },
}
for (let i = 0; i < 10; i++) {
  sample_data.push({
    id: i,
    title: `t${i}`,
    description: `d${i}`,
    status: `s${i}`,
  })
}
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'WELCOME TO jiraboard BACKEND SERVICE',
    athour: '',
  })
})

router.get('/tickets', function (req, res, next) {
  if (false) {
    var query = 'SELECT * FROM jiraboard'
    QueryExecute(query)
      .then((result) => {
        if (result) {
          res.status(200).send({ data: result })
        } else {
          res.status(200).send({ data: 'no' })
        }
      })
      .catch((err) => {
        if (err) {
          res.send({
            status: false,
            data: 'err',
            mysqldb: err,
          })
        }
      })
  } else {
    res.send({
      data: sample_dataset,
    })
  }
})

router.post('/save', function (req, res, next) {
  const { id, title, description, status, type } = {
    id: req.body.id,
    title: req.body?.title,
    description: req.body?.description,
    status: req.body.status,
    type: req.body.type,
  }
  if (type && title && description && title && status) {
    var query =
      'INSERT INTO ' +
      type.toString() +
      "  (title,description,status) VALUES ('" +
      title +
      "','" +
      description +
      "','" +
      status +
      "')"
    QueryExecute(query)
      .then((result) => {
        if (result) {
          res.send({
            status: true,
            data: {
              error: 'no',
              title: title,
              description: description,
              status: status,
            },
            mysqldb: result,
          })
        } else {
          sample_dataset[`${type}`]?.list.push({
            id: id,
            title: title,
            description: description,
            status: status,
          })
        }
      })
      .catch((err) => {
        if (err) {
          res.send({
            status: true,
            data: {
              error: 'Yes',
              title: title,
              description: description,
              status: status,
            },
            mysqldb: err,
          })
        } else {
          sample_dataset[`${type}`]?.list.push({
            id: id,
            title: title,
            description: description,
            status: status,
          })
        }
      })
  } else {
    sample_dataset[`${type}`]?.list = sample_dataset[`${type}`]?.list.push({
      id: id,
      title: title,
      description: description,
      status: status,
    })
    sample_data.push({
      id: id,
      title: title,
      description: description,
      status: status,
    })
  }
})

router.post('/update', function (req, res, next) {
  const { id, title, description, status, type } = {
    id: req.body.id,
    title: req.body?.title,
    description: req.body?.description,
    status: req.body.status,
    type: req.body.type,
  }
  var update_id = id

  if (type && id) {
    if (id != null && id != undefined) {
      var query = `UPDATE ${type} SET title=${title},description=${description},status=${status} WHERE Id=${id})`
      QueryExecute(query)
        .then((result) => {
          if (result) {
            res.send({
              status: true,
              data: {
                error: 'no',
                title: title,
                description: description,
                status: status,
              },
              mysqldb: result,
            })
          }
        })
        .catch((err) => {
          if (err) {
            res.send({
              status: true,
              data: {
                error: 'Yes',
                title: title,
                description: description,
                status: status,
                id: id,
              },
              mysqldb: err,
            })
          }
        })
    }
  } else {
    sample_date = sample_data.filter((item, index) => {
      var { id, title, description, status } = item
      if (id == update_id) {
        item = item
      }
    })
  }
})

router.post('/delete', function (req, res, next) {
  const { id, title, description, status } = {
    id: req.body.id,
    title: req.body?.title,
    description: req.body?.description,
    status: req.body.status,
    type: req.body.type,
  }
  var update_id = id

  if (type && id) {
    if (id != null && id != undefined) {
      var query = `DELETE FROM ${type}  WHERE Id=${id})`
      QueryExecute(query)
        .then((result) => {
          if (result) {
            res.send({
              status: true,
              data: {
                error: 'no',
                title: title,
                description: description,
                status: status,
                msg: 'deleted',
              },
              mysqldb: result,
            })
          } else {
            sample_dataset[`${type}`]?.list = sample_dataset[
              `${type}`
            ]?.list.filter((item, index) => {
              var { id, title, description, status } = item
              if (id != update_id) {
                item = item
              }
            })
          }
        })
        .catch((err) => {
          if (err) {
            res.send({
              status: true,
              data: {
                error: 'Yes',
                title: title,
                description: description,
                status: status,
                id: id,
              },
              mysqldb: err,
            })
          } else {
            sample_dataset[`${type}`]?.list = sample_dataset[
              `${type}`
            ]?.list.filter((item, index) => {
              var { id, title, description, status } = item
              if (id != update_id) {
                item = item
              }
            })
          }
        })
    }
  } else {
    sample_data = sample_data.filter((item, index) => {
      var { id, title, description, status } = item
      if (id != update_id) {
        item = item
      }
    })

    sample_dataset[`${type}`]?.list = sample_dataset[`${type}`]?.list.filter(
      (item, index) => {
        var { id, title, description, status } = item
        if (id != update_id) {
          item = item
        }
      },
    )
  }
})

module.exports = router
