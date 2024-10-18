import mongoose from "mongoose";

const BookedService = mongoose.Schema(
    {
        ServiceID: {
            type: Number,
            required: true
        },
        PK_n: {
            type: Number,
            required: true  
        },
        title: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: false
        },
        note: {
            type: String,
            required: false
        }
    })

export const bookedService = mongoose.model('Requested-Services', BookedService)


// Need to add a primary key field (unique numbers)