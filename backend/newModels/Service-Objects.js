import mongoose from "mongoose";

const Obj = mongoose.Schema(
    {
        ServiceID: {
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
        Mini_Description: {
            type: String
        },
        price: { //price in LKR
            type: Number,
            required: false
        },
        description: String
        //sold_out: {boolean}
        //discount: {percentage}
    }
);

export const serv_Obj = mongoose.model('Service-Items', Obj)