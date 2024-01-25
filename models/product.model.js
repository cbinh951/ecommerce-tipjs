"use strict";

const mongoose = require("mongoose"); // Erase if already required
const slugify = require("slugify");

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    product_name: {
      // quan jean cao cap
      type: String,
      required: true,
    },
    product_thumb: {
      type: String,
      required: true,
    },
    product_description: String,
    product_slug: String, // quan-jean-cao-cap
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
      enum: ["Electronics", "Clothing", "Furniture"],
    },
    product_shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
    product_attributes: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    product_rating: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [1, "Rating must be above 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    product_variations: { type: Array, default: [] },
    isDraft: {
      type: Boolean,
      default: true,
      index: true,
      select: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
      select: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

// Document middleware: runs before .save() and .create()
productSchema.pre("save", function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

const clothingSchema = new mongoose.Schema(
  {
    brand: { type: String, require: true },
    size: String,
    material: String,
    product_shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  },
  {
    timestamps: true,
    collection: "clothes",
  }
);

const electronicSchema = new mongoose.Schema(
  {
    manufacture: { type: String, require: true },
    model: String,
    color: String,
    product_shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  },
  {
    timestamps: true,
    collection: "electronics",
  }
);

const furnitureSchema = new mongoose.Schema(
  {
    brand: { type: String, require: true },
    size: String,
    material: String,
    product_shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  },
  {
    timestamps: true,
    collection: "furnitures",
  }
);

//Export the model
module.exports = {
  product: mongoose.model(DOCUMENT_NAME, productSchema),
  electronic: mongoose.model("Electronics", electronicSchema),
  clothing: mongoose.model("Clothing", clothingSchema),
  furniture: mongoose.model("Furniture", furnitureSchema),
};
