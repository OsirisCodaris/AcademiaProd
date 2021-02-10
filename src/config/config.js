module.exports = {
  admin: ['CODARIS', 'ACADEMIA'],
  db: {
    database: process.env.DB_NAME || 'academia_test',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS,
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || '127.0.0.1',
      logging: false,
    },
  },
  JWT_SECRET: process.env.JWT_SECRET || 'Wq9Ss6#z3%',
  JWT_TOKEN: process.env.JWT_TOKEN || 60 * 30,
  JWT_REFRESH: process.env.JWT_REFRESH || 60 * 60 * 2,
  doc: {
    path: process.env.DOC_PATH || 'public/documents',
  },
  forum: {
    path: process.env.FORUM_PATH || 'public/forum',
    extensions: [
      '.png',
      '.PNG',
      '.jpg',
      '.JPG',
      '.jpeg',
      '.JPEG',
      '.pdf',
      '.PDF',
    ],
  },

  port: process.env.APP_PORT || 8080,
  FRONT_URL: process.env.FRONT_URL || 'http://localhost:8080/#',
  URL_READ_DOC:
    process.env.URL_READ_DOC || 'http://192.168.4.75:1999/v1/reader',
  URL_READ_FORUM_FILE:
    process.env.URL_READ_DOC || 'http://192.168.4.75:1999/v1/readerfile',
}
