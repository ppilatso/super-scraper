import mongoose, { Document, Schema } from 'mongoose';

export interface Product {
  name: string;
  price: number;
  supermarket: string;
}

export interface ProductDocument extends Product, Document {}

const productSchema = new Schema<ProductDocument>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  supermarket: { type: String, required: true },
});

export const ProductModel = mongoose.model<ProductDocument>('Product', productSchema);