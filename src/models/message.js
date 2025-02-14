module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Message', {
        id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        userId: { type: DataTypes.UUID, allowNull: false },
        text: { type: DataTypes.STRING, allowNull: false }
    });
};
