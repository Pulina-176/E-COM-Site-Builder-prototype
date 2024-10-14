import mongoose from "mongoose";

const siteview = mongoose.Schema(
    {
        id: String,
        colortheme: String,
        Landing: {
            imageURL: String,
            color: String,
            businessTitle: String,
            businessDescription: String
        }, 
        Other: {
            imageURL: String,
            color: String,
            fontStyle: String,
            fontSize: String,
            fontColor: String,
        },
        Carousel: [{
            imageURL: String,
            h5: String,  // Main text under post 
        //    p: String    // Sub text under post
        }]
    }
);

export const display = mongoose.model('Site-Display-Settings', siteview)
