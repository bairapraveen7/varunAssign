const db = require('../../db.config')
const Book = db.books;

const createBook = (req,res) => {
  console.log(req.body);
      const studentObject = {
        name: req.body.name,
        author: req.body.author,
        publication: req.body.publication,
        year: req.body.year
      }
      console.log(Book)
      Book.create(studentObject).then(data => {
        res.send(data)
      }).catch(err => {
        res.status(500).send(err);
      });
}

const findAllBooks = (req,res) => {
    Book.findAll().then(data => {
      console.log(data);
        res.send(data)
    }).catch(err => res.status(500).send(err))
}

const updateBook = ((req,res) => {
  console.log(req.body)
    const newBookData = {
        id: req.body.id,
        name: req.body.name,
        author: req.body.author,
        publication: req.body.publication,
        year: req.body.year
    }

    Book.update(newBookData,{where: {id: req.body.id}}).then(() =>  {
      Book.findAll().then((data) => res.send(data))
      .catch((err) => res.status(500).send(err) )
    }).catch((err) => {
        res.status(500).send(err)
    })
})

const deleteBook = ((req,res) => {
  console.log(req);
  Book.destroy({
    where: {
        id: req.params.id
    }
  }).then(() => {
    Book.findAll().then(data => res.send(data)).catch((err) => res.status(500).send(err))
  })
  .catch((err) => res.send(err))
})

module.exports = {
    createBook,
    findAllBooks,
    updateBook,
    deleteBook
}