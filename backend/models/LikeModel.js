import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Users from "./UserModel.js";
import Foto from "./FotoModel.js";

const {DataTypes} = Sequelize;

const Like = db.define('like',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    fotoId:{
        type: DataTypes.INTEGER
    },

    userId:{
        type: DataTypes.INTEGER
    },

    tanggal_like:{
        type: DataTypes.DATEONLY
    }
},{
    freezeTableName: true
});

export default Like;

Users.hasMany(Like)
Like.belongsTo(Users,{foreignKey:'userId' , onDelete:'CASCADE' , onUpdate:'CASCADE'})

Foto.hasMany(Like,)
Like.belongsTo(Foto,{foreignKey:'fotoId' , onDelete:'CASCADE' , onUpdate:'CASCADE'})