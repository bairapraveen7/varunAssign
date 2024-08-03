const db = require('../../db.config')
const Library = db.libraries;

const createLibrary = (req,res) => {
  console.log(req);
      const studentObject = {
        studentName: req.body.studentName,
        bookName: req.body.bookName,
        startDate: req.body.startDate,
        endDate: req.body.endDate
      }
      console.log(Library)
      Library.create(studentObject).then(data => {
        res.send(data)
      }).catch(err => {
        res.status(500).send(err);
      });
}

const findAllLibraries = (req,res) => {
    Library.findAll().then(data => {
        res.send(data)
    }).catch(err => res.status(500).send(err))
}

const updateLibrary = ((req,res) => {
  console.log(req.body)
    const newLibraryData = {
        id: req.body.id,
        studentName: req.body.studentName,
        bookName: req.body.bookName,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    }

    Library.update(newLibraryData,{where: {id: req.body.id}}).then(() =>  {
      Library.findAll().then((data) => res.send(data))
      .catch((err) => res.status(500).send(err) )
    }).catch((err) => {
        res.status(500).send(err)
    })
})

const deleteLibrary = ((req,res) => {
  console.log(req);
  Library.destroy({
    where: {
        id: req.params.id
    }
  }).then(() => {
    Library.findAll().then(data => res.send(data)).catch((err) => res.status(500).send(err))
  })
  .catch((err) => res.send(err))
})

module.exports = {
    createLibrary,
    findAllLibraries,
    updateLibrary,
    deleteLibrary
}