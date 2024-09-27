import axios from 'axios';
import * as cheerio from 'cheerio';
import { Product, ProductModel } from './models/product';

export class Supermarket {
  constructor(public name: string, public url: string) {}

  async scrapeProducts(): Promise<Product[]> {
    // Implement scraping logic for each supermarket
    throw new Error('Method not implemented.');
  }
}

export class ProductScraper {
  constructor(private supermarkets: Supermarket[]) {}

  async scrapeAll(): Promise<void> {
    for (const supermarket of this.supermarkets) {
      const products = await supermarket.scrapeProducts();
      await this.saveToDB(products, supermarket.name);
    }
  }

  private async saveToDB(products: Product[], supermarket: string): Promise<void> {
    for (const product of products) {
      await ProductModel.findOneAndUpdate(
        { name: product.name, supermarket },
        { ...product, supermarket },
        { upsert: true, new: true }
      );
    }
  }
}