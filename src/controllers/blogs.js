const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blog = await Blog.findAll()
  return res.json(blog)
})

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  return res.json(blog)
})

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (!blog) return res.status(404).end()
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
