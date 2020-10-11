const multer = require('multer')
const path = require('path')
const config = require('./config')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, config.doc.path)
  },
  filename(req, file, callback) {
    callback(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

const upload = multer({
  storage,
  limits: {
    files: 2, // allow up to 5 files per request,
    fileSize: 200 * 1024 * 1024, // 20 MB (max file size)
  },
  fileFilter(req, file, callback) {
    const ext = path.extname(file.originalname)
    if (file.fieldname === 'pathfile' || file.fieldname === 'answerfile') {
      if (ext !== '.pdf') {
        callback(
          new Error("Seule l'extension pdf est acceptées comme document")
        )
      } else {
        callback(null, true)
      }
    } else {
      callback(new Error('fichier non reconnu'))
    }
  },
})

module.exports = upload
