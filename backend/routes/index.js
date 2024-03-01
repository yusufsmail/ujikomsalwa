import express from "express";
import { getUsers, Register, Login, Logout, getUserById } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { deleteAlbum, getAlbum, getAlbumById, getAlbumByUserId, postAlbum, updateAlbum } from "../controllers/Album.js";
import { deleteFoto, getFoto, getFotoByAlbumId, getFotoById, getFotoByUserId, postFoto, updateFoto } from "../controllers/Foto.js";
import { deleteKomentar, getKomentar, getKomentarByFotoId, getKomentarById, getKomentarByUserId, postKomentar, updateKomentar } from "../controllers/Komentar.js";
import { deleteLike, getLike, getLikeByFotoId, getLikeById, getLikeByUserId, postLike } from "../controllers/Like.js";

const router = express.Router();

// Login Register
router.get('/users', verifyToken, getUsers);
router.get('/users/:id', getUserById );
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

// Album
router.get('/album', getAlbum);
router.get('/album/:id', getAlbumById);
router.get('/album/users/:id', getAlbumByUserId);
router.post('/album', postAlbum);
router.patch('/album/:id', updateAlbum);
router.delete('/album/:id', deleteAlbum);

// Foto
router.get('/foto', getFoto);
router.get('/foto/:id', getFotoById);
router.get('/foto/album/:id', getFotoByAlbumId);
router.get('/foto/users/:id', getFotoByUserId);
router.post('/foto', postFoto);
router.patch('/foto/:id', updateFoto);
router.delete('/foto/:id', deleteFoto);

// Komentar
router.get('/komentar', getKomentar);
router.get('/komentar/:id', getKomentarById);
router.get('/komentar/foto/:id', getKomentarByFotoId);
router.get('/komentar/users/:id', getKomentarByUserId);
router.post('/komentar', postKomentar);
router.patch('/komentar/:id', updateKomentar);
router.delete('/komentar/:id', deleteKomentar);

// Like
router.get('/like', getLike);
router.get('/like/:id', getLikeById);
router.get('/like/users/:id', getLikeByUserId);
router.get('/like/foto/:id', getLikeByFotoId);
router.post('/like', postLike);
router.delete('/like/:id', deleteLike);

export default router;