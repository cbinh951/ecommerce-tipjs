'use strict';

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_thumb: {
      type: String,
      required: true,
    },
    product_description: String,
    product_price: {
      type: Number,
      required: true,
    },
    product_quantity: {
      type: Number,
      required: true,
    },
    product_type: {
      type: String,
      required: true,
      enum: ['Electronics', 'Clothing', 'Furniture'],
    },
    product_shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    product_attributes: {
      type: Schema.Types,
      Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const clothingSchema = new Schema(
  {
    brand: { type: String, require: true },
    size: String,
    material: String,
    product_shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  },
  {
    timestamps: true,
    collection: 'clothes',
  }
);

const electronicSchema = new Schema(
  {
    manufacture: { type: String, require: true },
    model: String,
    color: String,
    product_shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  },
  {
    timestamps: true,
    collection: 'electronics',
  }
);

//Export the model
module.exports = {
  product: mongoose.model(DOCUMENT_NAME, productSchema),
  electronic: mongoose.model('Electronics', electronicSchema),
  electronic: mongoose.model('Clothing', clothingSchema),
};
