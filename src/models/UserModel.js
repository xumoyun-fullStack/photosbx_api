module.exports = async function(Sequelize, sequelize){
    return sequelize.define("users",{
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4(),
            primaryKey: true,
        },
        username: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        isVerified: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNul: false,
        }
    })
}