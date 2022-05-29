const { AddPhoto, GetPhotos, DeletePhoto, AddComment } = require("../controllers/PhotoController");
const { SingUpPost, LoginPost, VerifyMail } = require("../controllers/UserController");
const AuthMiddleware = require("../middlewares/AuthMiddleware")
const router = require("express").Router();

router.get("/", (req, res) =>{
    
    res.status(200).json({
        ok: true
    })
    
})
router.post("/signup", SingUpPost);
router.post("/login", LoginPost);
router.get("/verify/:id", VerifyMail);


router.get("/photos",  GetPhotos)
router.post("/photos/create",AuthMiddleware, AddPhoto)
router.post("/photos/delete/:photo_id", AuthMiddleware, DeletePhoto);

router.post("/photos/comment/:photo_id", AuthMiddleware, AddComment);


module.exports = {
    path: "/",
    router
}