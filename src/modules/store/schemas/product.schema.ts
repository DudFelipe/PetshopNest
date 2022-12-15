import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantityOnHand: {
        type: Number,
        required: true
    }
});