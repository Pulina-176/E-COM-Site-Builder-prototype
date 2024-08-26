import express from 'express';
import { prod_obj_model } from '../newModels/Table-Products.js';
import { verifyToken } from '../middleware/verifytoken.js'; //middleware to verify token

const router = express.Router();

router.post('/', async(request,response)=>{  //add new commdoity type (Products)
    try{
        const Map = {
            GroupName: request.body.GroupName,
            Field_info: request.body.Field_info,
            Feature_string: request.body.Feature_string
        }

        const data = await prod_obj_model.create(Map); 

        return response.status(201).send(data)
    }
    catch(err){
        response.status(500).send(err)
    }
})

router.patch('/:ID', async(req,res) => {    //Update Service commodity object
    const { ID } = req.params

    const obj = await prod_obj_model.findOne({ ProductID : ID });
    console.log(obj)
    obj.GroupName = req.body.GroupName
    obj.Field_info = req.body.Field_info
    obj.Feature_string = req.body.Feature_string

    try {
        await obj.save();
        res.send('Files uploaded and paths saved to database successfully');
    } catch (error) {
        res.status(500).send(error);
    }

})

router.get('/', async(req, res)=>{

    const results = await prod_obj_model.find({});
    return res.status(200).json(results)
})

router.get('/:id', async(req, res)=>{  //get data filtered by service id
    const {id} = req.params
    const parsedID = parseInt(id)
    if (isNaN(parsedID)) return res.sendStatus(400);

    try{
        const result = await prod_obj_model.find( { ProductID : parsedID } )
        console.log(result)
        res.json(result)
    }
    catch{
        res.status(500).send('Error retrieving data from database', error)
    }
})

//Delete a product commodity
router.delete('/:id', async(req, res)=>{
    const { id } = req.params
    const parsedID = parseInt(id)
    if (isNaN(parsedID)) return res.sendStatus(400);
    
    try {
        await prod_obj_model.findOneAndDelete({ ProductID : parsedID })
                .then(doc => {
                    console.log("Deleted :", doc)
                })
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    finally{
        console.log("Delete successful")
    }
})

export default router;



 