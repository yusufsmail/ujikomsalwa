import Foto from "../models/FotoModel.js";
import path from "path";
import fs from "fs";

export const getFoto = async(req,res) => {
    try {
        const response = await Foto.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getFotoById = async(req, res)=>{
    try {
        const response = await Foto.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getFotoByUserId = async(req, res)=>{
    try {
        const user = req.params.id;
        if(!user) return res.status(400).json({error:"user tidak ditemukan"});

        const foto = await Foto.findAll({
            where:{
                userId:user,
            },
            logging: console.log,
        });
        
        if(!foto || foto.length===0) return res.status(404).json({msg:"foto tidak ditemukan"});
        res.json(foto);
    } catch (error) {
        console.log(error.message);
    }
}

export const getFotoByAlbumId = async(req, res)=>{
    try {
        const album = req.params.id
        if(!album) return res.status(400).json({error:"Album tidak ditemukan"});

        const foto = await Foto.findAll({
            where:{
                albumId:album,
            }
        });

        
        if(!foto | foto.length===0) return res.status(404).json({msg:"foto tidak ditemukan"});
        res.json(foto);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const postFoto = async(req,res) =>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const {albumId, userId, judul_foto, deskripsi} = req.body;
    const tanggal_unggah = new Date();
    const file = req.files.foto;
    const fileSize = file.data?.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];
  
    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Invalid Images' });
    if (fileSize > 5000000) return res.status(422).json({ msg: 'Image must be less than 5 MB' });
  
    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Foto.create({
                albumId,
                userId,
                judul_foto,
                deskripsi,
                tanggal_unggah,
                foto: fileName,
                url
            });
            res.status(201).json({msg: "Foto Upload Has Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const updateFoto = async(req, res)=>{
    const foto = await Foto.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!foto) return res.status(404).json({msg: "No Data Found"});
     
    let fileName = "";
    if(req.files === null){
        fileName = foto.foto;
    }else{
        const file = req.files.foto;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];
 
        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});
 
        const filepath = `./public/images/${foto.foto}`;
        fs.unlinkSync(filepath);
 
        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const {judul_foto, deskripsi} = req.body;
    const tanggal_unggah = new Date();
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
     
    try {
        await Foto.update({ 
                judul_foto,
                deskripsi,
                tanggal_unggah,
                foto: fileName,
                url: url
            },{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Foto Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteFoto = async(req, res)=>{
    const foto = await Foto.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!foto) return res.status(404).json({msg: "No Data Found"});
 
    try {
        const filepath = `./public/images/${foto.foto}`;
        fs.unlinkSync(filepath);
        await Foto.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Foto Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}