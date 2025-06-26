const router = require('express').Router()

const { fn, col } = require('sequelize')
const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const authors =  await Blog.findAll({
    attributes: [
      'author',
      [fn('COUNT', col('id')), 'articles'],
      [fn('SUM', col('likes')), 'likes'],
    ],
    group: ['author'],
  })

  return res.json(authors)
})

module.exports = router