//Collection that saves structures of Product-type commodities

import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const customObj = mongoose.Schema(
    {
        ProductID: {
            type: Number,
            unique: true
        },
        GroupName: {
            type: String,
            required: true
        },
        Field_info: {
            type: Object,
            of: String,
            required: false
        },
        Feature_string: {
            type: [Number],
            required: true
        }
        
    }
);

customObj.plugin(AutoIncrement, { inc_field: 'ProductID' });

export const prod_obj_model = mongoose.model('Products-commodities', customObj);

//Price field:
//Create a rule such that if buy feature is 1, a field named Price with Number type is mandatory