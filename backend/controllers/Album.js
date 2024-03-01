import Album from "../models/AlbumModel.js";
import Users from "../models/UserModel.js";

export const getAlbum = async (req, res) => {
    try {
        const response = await Album.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getAlbumById = async(req, res)=>{
    try {
        const response = await Album.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getAlbumByUserId = async(req, res)=>{
    try {
        const user = req.params.id
        if(!user) return res.status(400).json({error:"user tidak ditemukan"});

        const album = await Album.findAll({
            where:{
                userId:user,
            }
        });
        if(!album | album.leght===0) return res.status(404).json({msg:"album tidak ditemukan"});
        res.json(album);
    } catch (error) {
        console.log(error.message);
    }
}

export const postAlbum = async(req, res) => {
    
    try {

        const { userId, nama_album, deskripsi } = req.body;
        const tanggal_album = new Date();

        await Album.create({
            userId,
            tanggal_album,
            nama_album,
            deskripsi
        })
        res.status(200).json({msg: "Album Has Been Create"})
    } catch (error) {
        console.log(error.message);
    };
}

export const updateAlbum = async (req, res) => {
    const album = await Album.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!album) return res.status(404).json({msg: "No Data Found"});
    
    const { userId, nama_album, deskripsi } = req.body;
    const tanggal_album = new Date();

    try {
        await album.update({
            userId,
            tanggal_album,
            nama_album,
            deskripsi
        });
        res.status(200).json({msg : "Album Update Successfully"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteAlbum = async (req, res) => {
    const album = await Album.findOne({
        where:{
            id: req.params.id
        }
    });
    if (!album) return res.status(404).json({msg: "No Found Data"});

    try {
        await Album.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Album Has Been Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}