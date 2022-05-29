const { checkToken } = require("../modules/jwt");

module.exports = class PhotosController{
   
    static async GetPhotos(req, res){
        try{
            
            const psql = await req.psql;
            let photos = await psql.photos.findAll();
            let comments = await psql.comments.findAll();
           
            res.status(200).json({
                ok: true,
                photos,
                comments
            })
        }catch(e){
            console.log(e);
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }

    static async AddPhoto(req, res){
        try{
            const psql = await req.psql;

           
            let { url, description, photo_name, category, token } = req.body;

            token = checkToken(token);
            console.log(token)
            let user = await psql.users.findOne({
                where:{
                    id: token,
                },
                raw: true
            })
            if(!user) throw new Error("user not registered");

            let photo = await psql.photos.create({
                user_id: token,
                author: user.username,
                url,
                description,
                photo_name,
                category,
            });

            res.status(201).json({
                ok: true,
                photo
            })

        }catch(e){
            console.log(e);
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }

    static async DeletePhoto(req, res){
        try{
            const { photo_id } = req.params;
            const psql = await req.psql;
            let photo = await psql.photos.findOne({
                where:{
                    id: photo_id,
                },
                raw: true,
            })

            if(!photo) throw new Error("Photo not found!");

            await psql.photos.destroy({
                where:{
                    id: photo_id,
                },
                raw: true
            })

            res.status(200).json({
                ok: true,
                message: "deleted"
            })
        }catch(e){
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }

    static async FindPhoto(req, res){
        try{


        }catch(e){
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }

    static async AddComment(req, res){
        try{
            const { text } = req.body;
            const {photo_id} = req.params;

            const psql = await req.psql;
            const photo = await psql.photos.findOne({
                where:{
                    id: photo_id
                },
                raw: true,
            })

            const user = await psql.users.findOne({
                where: {
                    id: req.user,
                },
                raw: true,
            })

            if(!user) throw new Error("user not registered!");
            if(!photo) throw new Error("photo not found!");


            let comment = await psql.comments.create({
                photo_id,
                user_id: req.user,
                author: user.username,
                text
            })

            res.status(201).json({
                ok: true,
                comment,
            })

        }catch(e){
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }
}