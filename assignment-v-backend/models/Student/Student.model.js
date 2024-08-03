

module.exports = (sequelize,Sequelize) => {
    const students = sequelize.define('Student', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type:Sequelize.STRING,
        },
        class:{
            type: Sequelize.STRING,
             
        },
        photo:{
            type: Sequelize.STRING,
             
        },
        video:{
            type: Sequelize.STRING,
            
        },
    })
    return students;
}