// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router()

router.post('/user', (req, res) => {
  const body = req.body;
  res.json({
    confirmation: 'success',
    data: body,
    post:'new'
  })
})
module.exports = router
