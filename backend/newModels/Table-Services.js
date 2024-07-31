import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const customObj = mongoose.Schema(
    {
        ServiceID: {
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

customObj.plugin(AutoIncrement, { inc_field: 'ServiceID' });

export const serv_obj_model = mongoose.model('Services-commodities', customObj);