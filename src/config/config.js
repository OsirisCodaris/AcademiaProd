module.exports = {
  admin: ['CODARIS', 'ACADEMIA'],
  db: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    options: {
      dialect: process.env.DIALECT,
      host: process.env.HOST,
    },
  },
  JWT_SECRET: process.env.JWT_SECRET || 'Wq9Ss6#z3%',
  JWT_TOKEN: process.env.JWT_TOKEN || 60 * 30,
  JWT_REFRESH: process.env.JWT_REFRESH || 60 * 60 * 24 * 30,
  doc: {
    path: process.env.DOC_PATH || 'public/documents',
  },
  URL_READ_DOC:
    process.env.URL_READ_DOC || 'http://192.168.1.83:8081/v1/reader',
}
