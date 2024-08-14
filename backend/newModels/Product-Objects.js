import mongoose from "mongoose";

const Obj = mongoose.Schema(
    {
        ProductID: {
            type: Number,
            required: true
        },
        PK_n: {
            type: Number,
            required: false  
        },
        props: {
            type: Object,
            required: false
        },
        images: {
            type: [String],
            required: false
        },
        description: {
            type: String,
            required: false
        },
        price: { //price in cents
            type: Number,
            required: false
        },
        // currency: {
        //     enum: ['USD', 'LKR', 'EUR'],
        //     required: false
        // },
        //sold_out: {boolean}
    }
);

export const prod_Obj = mongoose.model('Product-Objects', Obj)