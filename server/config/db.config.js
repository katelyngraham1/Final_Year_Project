module.exports = {
    host: "localhost",
    username: "root",
    password: "",
    database: "file_a_while",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };