module.exports = async function(Sequelize, sequelize){
    return sequelize.define("comments", {
        id:{
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4(),
            primaryKey: true,
        },
        author: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type:Sequelize.DataTypes.STRING,
            allowNull: false,
        }
    })
}