import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Users from "./UserModel.js";
import Foto from "./FotoModel.js";

const {DataTypes} = Sequelize;

const Album = db.define('album',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId:{
        type: DataTypes.INTEGER
    },

    // fotoId:{
    //     type: DataTypes.INTEGER
    // },
    
    tanggal_album:{
        type: DataTypes.DATEONLY
    },

    nama_album: {
        type: DataTypes.STRING
    },
    
    deskripsi: {
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});

export default Album;

Users.hasMany(Album);
Album.belongsTo(Users,{foreignKey:'userId' , onDelete:'CASCADE' , onUpdate:'CASCADE'});

Album.hasMany(Foto)
// Foto.hasMany(Album,{foreignKey:'fotoId', onDelete:'CASCADE' , onUpdate:'CASCADE'})