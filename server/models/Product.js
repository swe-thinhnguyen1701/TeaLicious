const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },
    stock: {
        type: Number,
        default: 0,
        required: true
    },
    image: {
        type: String
    },
    weight: {
        type: Number,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    reviews: [String]
}, {
    toJSON: {
        virtuals: true
    },
    id: false
});

productSchema.virtual("reviewsCount").get(function () { return this.reviews.length });

const Product = model("Product", productSchema);

module.exports = Product;