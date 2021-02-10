const express = require('express')

const router = express.Router()
const path = require('path')
const config = require('../../config/config')

router.route('/readerfile/:file').get((req, res) => {
  const options = {
    root: path.join(process.cwd(), config.forum.path),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  }
  const fileName = req.params.file
  res.sendFile(fileName, options, (err) => {
    if (err) {
      res.sendStatus('404')
    }
  })
})

module.exports = router
