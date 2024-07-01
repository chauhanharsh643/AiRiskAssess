const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// sign up

router.post("/signup", async(req, res) => {
    try {
        const {first_name, last_name, email, password} = req.body;
        const hashPassword = bcrypt.hashSync(password);
        const user = new User({first_name, last_name, email, password : hashPassword}); 
        await user.save().then(() =>
            res.status(200).json({message : "User SignUp successfully"})
        );
    } catch (error) {
        res.status(200).json({message : "User Already exists"});
    }
})

// log in
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(200).json({message : "Please Sign up first"});
        }
        else{
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
            // console.log(isPasswordCorrect);
            if(!isPasswordCorrect){
                res.status(200).json({message : "Password is not Correct"});
            }
            else{
                const {password, ...others} = user._doc;
                res.status(200).json({others});
            }
        }
    } catch (error) {
        res.status(200).json({message : "Unexpected error"});
    }
})


module.exports = router;