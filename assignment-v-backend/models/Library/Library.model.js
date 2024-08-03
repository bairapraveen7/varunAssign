

module.exports = (sequelize,Sequelize) => {
    const libraries = sequelize.define('Library', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        studentName: {
            type:Sequelize.STRING,
        },
        bookName:{
            type: Sequelize.STRING,
             
        },
        startDate:{
            type: Sequelize.STRING,
             
        },
        endDate:{
            type: Sequelize.STRING,
        },
    })
    return libraries;
}