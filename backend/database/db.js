const mongoose = require("mongoose");

const connection = async (req, res) => {
    try{
        await mongoose
            .connect(
            "mongodb+srv://chauhanharsh643:zmtG73TUCdxclsms@cluster0.ecny3uy.mongodb.net/"
            )
            .then(() => {
            console.log("connected");
        })
    }
    catch(error){
        // res.status(400).json({
        //     message : "Not Connected"
        // });
        console.log("Not connected");
    }
}

connection();