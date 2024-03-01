import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import Users from "./models/UserModel.js";
import Album from "./models/AlbumModel.js";
import Foto from "./models/FotoModel.js";
import Komentar from "./models/KomentarModel.js";
import Like from "./models/LikeModel.js";
import fileUpload from "express-fileupload";
dotenv.config();
const app = express();

try {
    await db.authenticate();
    Foto.sync()
    Users.sync()
    Album.sync()
    Komentar.sync()
    Like.sync()
    console.log('Database Connected...');
} catch (error) {
    console.error(error);
}

//  await db.sync()

app.use(express.static('public'))
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(fileUpload())
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, ()=> console.log('Server Running...'));