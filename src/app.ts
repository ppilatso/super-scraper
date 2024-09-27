import express from 'express';
import mongoose from 'mongoose';
import { ProductScraper, Supermarket } from './scraper';
import { ProductModel } from './models/product';

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/product_scraper');

const supermarkets = [
  new Supermarket("SupermarketA", "https://www.supermarketa.com"),
  new Supermarket("SupermarketB", "https://www.supermarketb.com"),
];

const scraper = new ProductScraper(supermarkets);

app.get('/scrape', async (req, res) => {
  try {
    await scraper.scrapeAll();
    res.json({ message: 'Scraping completed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while scraping' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});