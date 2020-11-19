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
  JWT_REFRESH: process.env.JWT_REFRESH || 60 * 60 * 2,
  doc: {
    path: process.env.DOC_PATH || 'public/documents',
  },
  FRONT_URL: process.env.FRONT_URL || 'http://localhost:8080/#',
  URL_READ_DOC: process.env.URL_READ_DOC || 'http://localhost:1999/v1/reader',
}
