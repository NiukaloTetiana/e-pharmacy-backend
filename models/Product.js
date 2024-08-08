import { Schema, model } from "mongoose";

import { handleMongooseError } from "../helpers/handleMongooseError.js";

const productSchema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    price: {
      type: String,
    },
    stock: {
      type: String,
    },
    category: {
      type: String,
    },
    photo: {
      type: String,
    },
    suppliers: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

productSchema.post("save", handleMongooseError);

export const Product = model("product", productSchema);
