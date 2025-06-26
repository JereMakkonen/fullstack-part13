const router = require('express').Router()
const { Op } = require('sequelize')

const { tokenExtractor } = require('../util/middleware');
const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.substring]: req.query.search } },
      { author: { [Op.substring]: req.query.search } }
    ]
  }

  const blog = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['id', 'username']
    },
    order: [['likes', 'DESC']],
    where
  })
  
  return res.json(blog)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  return res.json(blog)
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.findByPk(req.params.id)

  if (!blog) return res.status(404).end()
  if (!user || user.id !== blog.userId) return res.status(401).end()

  await blog.destroy()
  return res.status(204).end() 
})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)

  if (!blog) return res.status(404).end()

  const updatedBlog = await blog.update({ likes: req.body.likes })
  return res.json(updatedBlog)
})

module.exports = router
