const Product = require('../models/product');

class ProductController {
  async createProduct(req, res) {
    try {
      const { name, price } = req.body;

      const newProduct = await Product.create({ name, price });

      return res.status(201).json(newProduct);
    } catch (error) {
      console.error('Failed to create product:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();

      return res.json(products);
    } catch (error) {
      console.error('Failed to get products:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      return res.json(product);
    } catch (error) {
      console.error('Failed to get product:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, price } = req.body;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      product.name = name;
      product.price = price;

      await product.save();

      return res.json(product);
    } catch (error) {
      console.error('Failed to update product:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      await product.destroy();

      return res.status(204).end();
    } catch (error) {
      console.error('Failed to delete product:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = ProductController;
