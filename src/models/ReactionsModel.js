module.exports = async function(Sequelize, sequelize){
    return sequelize.define("reactions", {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4(),
            primaryKey: true,
        },
        like: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        },
        disLike: {
            type: Sequelize.DataTypes.BOOLEAN,
            dafaultValue: false,
            allowNull: true,
        }
    })
}