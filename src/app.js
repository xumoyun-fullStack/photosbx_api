const express = require("express");
const app = new express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { PORT } = require("../config");
const postgres = require("./modules/postgres");
const CookieParser = require("cookie-parser");
const morgan = require("morgan");

async function Server(){
    try{
        app.listen(PORT,() => console.log("Server ready..."));

        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(cors());
        app.use(CookieParser())
        app.use(morgan("tiny"))

        app.use(async (req, res, next)=>{
            const psql = postgres();
            req.psql = psql;
            next();
        })

        fs.readdir(path.join(__dirname, "routes"), (err, files) => {
            if(!err){
                files.forEach(file => {
                    const routePath = path.join(__dirname, "routes", file);
                    const Route = require(routePath);

                    if(Route.path && Route.router) app.use(Route.path, Route.router);
                })
            }
        })

    }catch(e){
        console.log("server: " + e)
    }
}

Server();
