/**
 * schema for category
 */



module.exports = (sequelize, Sequelize) => {

    const category = sequelize.define("category", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        name: {
            type: Sequelize.STRING,
            allowNull: false

        },
        description: {
            type: Sequelize.STRING
        },
    },{
        tableName :'categories'
    })
    return category;
}