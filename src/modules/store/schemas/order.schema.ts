import mongoose from "mongoose";

export const OrderSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    items: [
        {
            id: {
                type: String
            },
            product: {
                type: String
            },
            price: {
                type: Number
            },
            quantity: {
                type: Number
            }
        }
    ],
    total: {
        type: Number
    }
});