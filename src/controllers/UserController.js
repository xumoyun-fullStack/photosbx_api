const { generateHash, compareHash } = require("../modules/bcrypt");
const { generateToken } = require("../modules/jwt");
const Sendemail = require("../modules/email");
const { PORT } = require("../../config");

module.exports = class UserController{
    static async SingUpPost(req, res){
        try{
            const {  username, email, password } = req.body;

            const psql = await req.psql;
            let user = await psql.users.findOne({
                where: {
                    username,
                },
                raw:  true,
            })
            

            if(user) throw new Error("This username already taken!");

            const pass = await generateHash(password);

            user = await psql.users.create({
                username, 
                email,
                password: pass,
            },{
                raw: true,
            })

            
            

            let token =  generateToken(user.id);

            let verificationMail = await Sendemail(
                email,
                "Verification link",
                null,
                `<p><a href="https://photosapibx.onrender.com/verify/${user.id}">Click here</a> to activate your account</p>`
            )

            res.cookie("token", token);
            res.status(201).json({
                ok: true,
                user,
                token
            })

        }catch(e){
            console.log(e);
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }

    static async VerifyMail(req, res){
        try{
            const {id} = req.params;
            const psql = await req.psql;
            
            let user = await psql.users.update({
                    isVerified: true
                },{
                where:{
                    id
                }
            })


            res.redirect("/")
        }catch(e){
            res.status(400).json({
                ok: false,
                message: e + ""
            })
            console.log(e);
        }
    }
    
    static async LoginPost(req, res){
        try{
            const { username, password } = req.body;
            const psql = await req.psql;
            let user = await psql.users.findOne({
                where:{
                    username,
                },
                raw: true,
            })

            if(!user) throw new Error("User not found!");

            let isTrue = await compareHash(password, user.password);
            
            if(!isTrue) throw new Error("Incorrect password");
            if(!user.isVerified) throw new Error("This user not verified!")

           

            let token =  generateToken(user.id);

            res.cookie("token", token);
            req.user = user;
            res.status(200).json({
                ok: true,
                message: "logged in",
                token,
            })

        }catch(e){
            console.log(e);
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }
}