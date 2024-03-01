import Komentar from "../models/KomentarModel.js";

export const getKomentar = async(req,res) => {
    try {
        const response = await Komentar.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getKomentarById = async(req, res)=>{
    try {
        const response = await Komentar.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getKomentarByFotoId = async(req, res)=>{
    try {
        const foto = req.params.id
        if(!foto) return res.status(404).json({msg:"foto tidak ditemukan"});
        const komentar = await Komentar.findAll({
            where: {
                fotoId : foto
            }
        });

        if(!komentar | komentar.length === 0) return res.status(404).json({msg:"komentar kosong"});

        res.json(komentar)
    } catch (error) {
        console.log(error.message);
    }
}

export const getKomentarByUserId = async(req, res)=>{
    try {
        const user = req.params.id
        if(!user) return res.status(404).json({msg:"user tidak ditemukan"});
        
        const komentar = await Komentar.findAll({
            where: {
                userId : user
            }
        });

        if(!komentar | komentar.length === 0) return res.status(404).json({msg:"komentar kosong"});

        res.json(komentar)
    } catch (error) {
        console.log(error.message);
    }
}

export const postKomentar = async(req, res) => {
    
    try {

        const { fotoId, userId, isi_komentar } = req.body;
        const tanggal_komentar = new Date();

        await Komentar.create({
            fotoId,
            userId,
            isi_komentar,
            tanggal_komentar
        })
        res.status(200).json({msg: "Komentar Has Been Create"})
    } catch (error) {
        console.log(error.message);
    };
}

export const updateKomentar = async (req, res) => {
    const komentar = await Komentar.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!komentar) return res.status(404).json({msg: "No Data Found"});
    
    const {isi_komentar } = req.body;
    const tanggal_komentar = new Date();

    try {
        await komentar.update({
            isi_komentar,
            tanggal_komentar
        });
        res.status(200).json({msg : "Komentar Update Successfully"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteKomentar = async (req, res) => {
    const komentar = await Komentar.findOne({
        where:{
            id: req.params.id
        }
    });
    if (!komentar) return res.status(404).json({msg: "No Found Data"});

    try {
        await Komentar.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Komentar Has Been Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}