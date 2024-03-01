import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Album from "./AlbumModel.js";
import Users from "./UserModel.js";
import Komentar from "./KomentarModel.js";

const {DataTypes} = Sequelize;

const Foto = db.define('foto',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    albumId:{
        type: DataTypes.INTEGER
    },

    userId:{
        type: DataTypes.INTEGER
    },

    judul_foto: {
        type: DataTypes.STRING
    },

    deskripsi: {
        type: DataTypes.STRING
    },

    tanggal_unggah: {
        type: DataTypes.DATEONLY
    },

    foto: {
        type: DataTypes.STRING
    },

    url: {
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});

export default Foto;

Users.hasMany(Foto)
Foto.belongsTo(Users,{foreignKey:'userId' , onDelete:'CASCADE' , onUpdate:'CASCADE'})

Foto.hasMany(Komentar)
Komentar.belongsTo(Foto,{foreignKey:'fotoId' , onDelete:'CASCADE' , onUpdate:'CASCADE'})