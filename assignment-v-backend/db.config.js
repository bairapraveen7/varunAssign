const { Password } = require('@mui/icons-material')
const Sequelize = require('sequelize')
const dbName = 'sample'
const dbUser = 'root'
const dbPassword = ''

const sequelize = new Sequelize(dbName,dbUser,dbPassword,{
   host: '127.0.0.1',
   port: '3306',
   dialect: 'mysql'
});

const db = {} 
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.students = require('./models/Student/Student.model')
(sequelize,Sequelize);

db.books = require('./models/Book/Book.model')(sequelize,Sequelize);

db.libraries = require('./models/Library/Library.model')(sequelize,Sequelize);

module.exports = db;