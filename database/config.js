module.exports = {
  host: process.env.MYSQL_HOSTNAME,
  user: process.env.MYSQL_USERNAME,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
};
