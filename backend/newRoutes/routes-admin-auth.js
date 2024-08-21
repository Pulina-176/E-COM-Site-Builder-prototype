import express from "express";
import  jwt  from "jsonwebtoken";

const router = express()

router.post('/', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const admin = {
               username: 'admin',
               id: '_jfkeycbx,ootiu',
                password: 'root123' }

    let token
    try{
        if (username!==admin.username){
            return res.status(401).json({error: 'Invalid credentials'})
        }
        else if (password!==admin.password){
            return res.status(401).json({error: 'Invalid credentials'})
        }
        else if (username==admin.username && password==admin.password){
            token = jwt.sign({id: admin.id , username: admin.username}, process.env.JWT_SECRET)
            res.cookie('access_token', token, {httpOnly: true, sameSite: 'Strict', expires: new Date(Date.now() + 60*60*1000)})
               .status(200)
               .json({message: 'Login successful'})
        }
    }
    catch{
        res.status(500).json({error: 'Server error'})
    }

})

export default router;