import express from "express";
import path from 'path';
import { prod_Obj } from "../newModels/Product-Objects.js";

const router = express();

router.post('/', async(req, res) => {

    const newobj = new prod_Obj();
    newobj.ProductID = req.body.ProductID;
    newobj.PK_n = req.body.PK_n;
    newobj.props = JSON.parse(req.body.props);
    newobj.images = req.body.images;

    try {
        await newobj.save();
        res.send('Files uploaded and paths saved to database successfully');
    } catch (error) {
        res.status(500).send(error);
    }
})

router.patch('/:ID/:pk', async(req,res) => {          //Update product items
    const {ID, pk} = req.params

    const obj = await prod_Obj.findOne({ PK_n : pk , ProductID : ID});
    console.log(obj)
    obj.props = JSON.parse(req.body.props);
    obj.images = req.body.images;
    

    try {
        await obj.save();
        res.send('Files uploaded and paths saved to database successfully');
    } catch (error) {
        console.log("New Fucking Error boy!",error)
        res.status(500).send(error);
    }
})

router.get('/:productID', async(req, res)=>{ //get products by ProductID

    const {productID} = req.params;

    if (!productID) {
        return res.status(400).send('Parameter missing');
    }

    try {
        const results = await prod_Obj.find({ProductID : productID});
        res.json(results);
    } catch (error) {
        res.status(500).send('Error retrieving data from database');
    }

})

router.get('/nxt-pk/:productID', async(req, res) => { //gets Primary key for new item.
    const {productID} = req.params
    if (!productID) {
        return res.status(400).send('Parameter missing');
    }
    const parsedID = parseInt(productID)
    if (isNaN(parsedID)) return res.sendStatus(400);

    try{
        let final = 1;
        const results = await prod_Obj.find({ProductID : parsedID});

        if(results.length==0) final = 1; //No items yet added under {parsedID} category
        else {
            const len = results.length
            final = results[len-1]["PK_n"]  //last item's pk
        }
        res.json(final+1)  //next item's pk (to be added.)
    } catch (error) {
        res.status(500).send('Error retrieving data from database', error)
    }
})

router.get('/:ID/:pk', async(req, res) => {
    const {ID, pk} = req.params
    if (!ID) {
        return res.status(400).send('Parameter missing');
    }
    const parsedID = parseInt(ID)
    if (isNaN(parsedID)) return res.sendStatus(400);

    try{
        const result = await prod_Obj.find( { ProductID : parsedID, PK_n : pk } )
        console.log(result)
        res.json(result)
    }
    catch (error){
        res.status(500).send('Error retrieving data from database', error)
    }
    

})

router.delete('/:PID/:pk', async (req, res) => {  //Delete Product
    const { pk, PID } = req.params
    const parsedID = parseInt(PID)
    if (isNaN(parsedID)) return res.sendStatus(400);
    
    try {
        await prod_Obj.findOneAndDelete({ PK_n : pk , ProductID : parsedID })
                .then(doc => {
                    console.log("Deleted :", doc)
                })
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }

})

router.post('/des/:pID/:pk', async(req, res) => {  //Update Description
    const { pID, pk } = req.params
    const { description } = req.body;

    try {
        const updatedObj = await prod_Obj.findOneAndUpdate(
            { ProductID: pID, PK_n: pk },
            { description: description },
            { new: true, useFindAndModify: true } // `new: true` returns the updated document
        );

        if (!updatedObj) {
            return res.status(404).send('Object not found');
        }

        res.status(200).json(updatedObj); 
    }
    
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
})

export default router




 