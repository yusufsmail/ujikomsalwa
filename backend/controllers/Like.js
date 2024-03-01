import Like from "../models/LikeModel.js";

export const getLike = async (req, res) => {
    try {
        const response = await Like.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getLikeById = async(req, res)=>{
    try {
        const response = await Like.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getLikeByFotoId = async(req, res)=>{
    try {
        const foto = req.params.id
        if(!foto) return res.status(404).json({msg:"foto tidak di temukan"});
        const like = await Like.findAll({
            where:{
                fotoId:foto
            }
        });
        if(!like | like.length === 0) return res.status(404).json({msg:"like kosong"});

        res.json(like);
    } catch (error) {
        console.log(error.message)
    }
}

export const getLikeByUserId = async(req, res)=>{
    try {
        const user = req.params.id
        if(!user) return res.status(404).json({msg:"user tidak di temukan"});
        const like = await Like.findAll({
            where:{
                userId:user
            }
        });
        if(!like | like.length === 0) return res.status(404).json({msg:"like kosong"});

        res.json(like);
    } catch (error) {
        console.log(error.message)
    }
}

export const postLike = async(req, res) => {
    
    try {
        const {fotoId, userId } = req.body;
        const tanggal_like = new Date();

        await Like.create({
            fotoId,
            userId,
            tanggal_like
        })
        res.status(200).json({msg: "Like Has Been Create"})
    } catch (error) {
        console.log(error.message);
    };
}

export const deleteLike = async (req, res) => {
    const like = await Like.findOne({
        where:{
            id: req.params.id
        }
    });
    if (!like) return res.status(404).json({msg: "No Found Data"});

    try {
        await Like.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Like Has Been Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}