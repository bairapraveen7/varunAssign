

module.exports = (sequelize,Sequelize) => {
    const books = sequelize.define('Book', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type:Sequelize.STRING,
        },
        author:{
            type: Sequelize.STRING,
             
        },
        publication:{
            type: Sequelize.STRING,
             
        },
        year:{
            type: Sequelize.STRING,
            
        },
    })
    return books;
}