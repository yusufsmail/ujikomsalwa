import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    name:{
        type: DataTypes.STRING
    },
    namalengkap:{
        type: DataTypes.STRING
    },
    alamat:{
        type: DataTypes.TEXT
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName: true
});


export default Users;

(async()=>{
    await db.sync();
})();