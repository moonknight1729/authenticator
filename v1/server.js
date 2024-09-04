const express=require('express');
const server=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');


const{PORT,URI}=require("./config/index");
const Router=require("./routes/index")

server.use(cors());
server.disable("x-powered-by"); //Reduce fingerprinting
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

const mongoose = require("mongoose");
mongoose
    .connect(URI)
    .then(console.log("Connected to database"))
    .catch((err) => console.log(err));

Router(server);

server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
    