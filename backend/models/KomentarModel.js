import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Komentar = db.define('komentar',{
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

    isi_komentar:{
        type: DataTypes.TEXT
    },

    tanggal_komentar:{
        type: DataTypes.DATEONLY
    }
},{
    freezeTableName: true
});

export default Komentar;

Users.hasMany(Komentar)
Komentar.belongsTo(Users,{foreignKey: 'userId' , onDelete:'CASCADE' , onUpdate:'CASCADE'})