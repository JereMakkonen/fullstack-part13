const router = require('express').Router()

const { tokenExtractor } = require('../util/middleware')
const { ReadingList, User } = require('../models')

router.post('/', async (req, res) => {
  const readingList = await ReadingList.create(req.body)
  return res.json(readingList)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const readingList = await ReadingList.findByPk(req.params.id)

  if (!readingList) return res.status(404).end()
  if (!user || user.id !== readingList.userId) return res.status(401).end()

  const updatedReadingList = await readingList.update(req.body)
  return res.json(updatedReadingList)
})

module.exports = router