module.exports = async function(Sequelize, sequelize){
    return sequelize.define("photos", {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4(),
            primaryKey: true,
        },
        photo_name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        }
    })
}