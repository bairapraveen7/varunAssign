const db = require('../../db.config')
const Student = db.students;

const createStudent = (req,res) => {
  console.log(req);
      const studentObject = {
        name: req.body.name,
        class: req.body.class,
        photo: req.body.photo,
        video: req.body.video
      }
      console.log(Student)
      Student.create(studentObject).then(data => {
        res.send(data)
      }).catch(err => {
        res.status(500).send(err);
      });
}

const findAllStudents = (req,res) => {
    Student.findAll().then(data => {
        res.send(data)
    }).catch(err => res.status(500).send(err))
}

const updateStudent = ((req,res) => {
  console.log(req.body)
    const newStudentData = {
        id: req.body.id,
        name: req.body.name,
        class: req.body.class,
        photo: req.body.photo,
        video: req.body.video
    }

    Student.update(newStudentData,{where: {id: req.body.id}}).then(() =>  {
      Student.findAll().then((data) => res.send(data))
      .catch((err) => res.status(500).send(err) )
    }).catch((err) => {
        res.status(500).send(err)
    })
})

const deleteStudent = ((req,res) => {
  console.log(req);
  Student.destroy({
    where: {
        id: req.params.id
    }
  }).then(() => {
    Student.findAll().then(data => res.send(data)).catch((err) => res.status(500).send(err))
  })
  .catch((err) => res.send(err))
})

module.exports = {
    createStudent,
    findAllStudents,
    updateStudent,
    deleteStudent
}