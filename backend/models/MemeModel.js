import { DataTypes } from 'sequelize';
import sequelize from '../DataBaseConfig.js';
import User from './UserModel.js';

const Meme = sequelize.define('Meme', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    }, 
    {
        timestamps: true,
    }
);

User.hasMany(Meme);
Meme.belongsTo(User);

Meme.sync();

export default Meme;
