import express from "express";
import multer from 'multer';
import path from 'path';
import { serv_Obj } from "../newModels/Service-Objects.js";

const router = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

function checkFileType(file, cb) {
    // Allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 3000000},
    fileFilter: function(req, file, cb){
        checkFileType(file,cb);
    }
}).array('images', 3)

router.post('/', upload, async(req, res) => {
    let files;
    let filePaths

    console.log(req)
    
    if(req.files){
        files = req.files;
        filePaths = files.map(file => file.filename)
    }

    const newobj = new serv_Obj();
    newobj.ServiceID = req.body.ServiceID;
    newobj.PK_n = req.body.PK_n;
    newobj.props = JSON.parse(req.body.props);
    newobj.images = filePaths;
    newobj.Mini_Description = req.body.Mini_Description

    try {
        await newobj.save();
        res.send('Files uploaded and paths saved to database successfully');
    } catch (error) {
        res.status(500).send(error);
    }
})

router.patch('/:ID/:pk', upload, async(req,res) => {          //Update product items
    const {ID, pk} = req.params

    let files;
    let filePaths
    console.log(req)
    
    if(req.files){
        files = req.files;
        filePaths = files.map(file => file.filename)
    }

    const obj = await serv_Obj.findOne({ PK_n : pk , ServiceID : ID});
    console.log(obj)
    obj.props = JSON.parse(req.body.props);
    obj.images = filePaths;
    obj.Mini_Description = req.body.Mini_Description

    try {
        await obj.save();
        res.send('Files uploaded and paths saved to database successfully');
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/:serviceID', async(req, res)=>{ //get all services by ServiceID (all under one category)

    const {serviceID} = req.params;

    if (!serviceID) {
        return res.status(400).send('Parameter missing');
    }

    try {
        const results = await serv_Obj.find({ServiceID : serviceID});
        res.json(results);
    } catch (error) {
        res.status(500).send('Error retrieving data from database');
    }

})

router.get('/nxt-pk/:serviceID', async(req, res) => { //gets Primary key for new item.
    const {serviceID} = req.params
    if (!serviceID) {
        return res.status(400).send('Parameter missing');
    }
    console.log(serviceID)////
    const parsedID = parseInt(serviceID)
    if (isNaN(parsedID)) return res.sendStatus(400);

    try{
        let final = 0;
        const results = await serv_Obj.find({ServiceID : parsedID});
        console.log(results)

        if(results.length==0) { //No items yet added under {parsedID} category
            final = 0;
        } 
        else {
            const len = results.length
            final = results[len-1]["PK_n"]  //last item's pk
        }
        res.json(final+1)  //next item's pk (to be added.)
     } catch (error) {
        res.status(500).send('Error retrieving data from database', error)
    }
})

router.get('/:ID/:pk', async(req, res) => {  //get single item of any category
    const {ID, pk} = req.params
    if (!ID) {
        return res.status(400).send('Parameter missing');
    }
    const parsedID = parseInt(ID)
    if (isNaN(parsedID)) return res.sendStatus(400);

    try{
        const result = await serv_Obj.find( { ServiceID : parsedID, PK_n : pk } )
        console.log(result)
        res.json(result)
    }
    catch (error){
        res.status(500).send('Error retrieving data from database', error)
    }
    

})

router.delete('/:SID/:pk', async (req, res) => {  //Delete Service
    const { pk, SID } = req.params
    const parsedID = parseInt(SID)
    if (isNaN(parsedID)) return res.sendStatus(400);
    
    try {
        await serv_Obj.findOneAndDelete({ PK_n : pk , ServiceID : parsedID })
                .then(doc => {
                    console.log("Deleted :", doc)
                })
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }

})

export default router




 