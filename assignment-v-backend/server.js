const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const db = require('./db.config');

const studentController = require('./models/Student/Student.controller')
const bookController = require('./models/Book/Book.controller');
const libraryController = require('./models/Library/Library.controller');

db.sequelize.sync();

app.use(cors({
    origin: 'http://localhost:3000'
}));


app.get('/',(req,res) => {
    res.send("hello")
});

app.post("/student/new", (req,res) => {
    studentController.createStudent(req,res);
}) 

app.get("/student/details", (req,res) => {
    studentController.findAllStudents(req,res);
}) 

app.post("/student/update", (req,res) => {
    studentController.updateStudent(req,res)
})

app.delete("/student/delete/:id", (req,res) => {
    studentController.deleteStudent(req,res)
})

app.post("/book/new", (req,res) => {
    bookController.createBook(req,res);
}) 

app.get("/book/details", (req,res) => {
    console.log("hi");
    bookController.findAllBooks(req,res);
}) 

app.post("/book/update", (req,res) => {
    bookController.updateBook(req,res)
})

app.delete("/book/delete/:id", (req,res) => {
    bookController.deleteBook(req,res)
})

app.post("/library/new", (req,res) => {
    libraryController.createLibrary(req,res);
}) 

app.get("/library/details", (req,res) => {
    libraryController.findAllLibraries(req,res);
}) 

app.post("/library/update", (req,res) => {
    libraryController.updateLibrary(req,res)
})

app.delete("/library/delete/:id", (req,res) => {
    libraryController.deleteLibrary(req,res)
})

app.listen(8000, () => {
    console.log("Running")
})