import mongoose from "mongoose";

const Orders = mongoose.Schema(
    {
        Email: {
            type: String,
            required: true
        },
        ContactNo: {
            type: String,
            required: true
        },
        Order: {
            type: [String],
            required: true
        },
        Ordered_date: {
            type: Date,
            required: true
        },
        Total_payed: {
            type: Number,
            required: true
        }
    })

export const orders = mongoose.model('Orders', Orders)


// Need to add a primary key field (unique numbers)