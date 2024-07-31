import mongoose from "mongoose";

const siteview = mongoose.Schema(
    {
        id: String,
        Landing: {
            imageURL: String,
            color: String,
            businessTitle: String,
        }, 
        Other: {
            imageURL: String,
            color: String,
            fontStyle: String,
            fontSize: String,
            fontColor: String,
        }
    }
);

export const display = mongoose.model('Site-Display-Settings', siteview)
