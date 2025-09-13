const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const router = express.Router();

// Get all products with optional filtering
router.get('/', async (req, res) => {
  try {
    const { 
      scentFamily, 
      featured, 
      minPrice, 
      maxPrice, 
      search,
      limit = 20,
      page = 1 
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (scentFamily) filter.scentFamily = scentFamily;
    if (featured === 'true') filter.featured = true;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (Number(page) - 1) * Number(limit);
    
    const products = await Product.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .limit(Number(limit))
      .skip(skip)
      .lean();

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get featured products for homepage
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ featured: true })
      .limit(6)
      .lean();
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ message: 'Error fetching featured products' });
  }
});

// Get product by slug or ID
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Try to find by slug first, then by ID
    let product = await Product.findOne({ slug: identifier }).lean();
    
    if (!product && mongoose.Types.ObjectId.isValid(identifier)) {
      product = await Product.findById(identifier).lean();
    }
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Get scent families for filtering
router.get('/meta/scent-families', async (req, res) => {
  try {
    const scentFamilies = await Product.distinct('scentFamily');
    res.json(scentFamilies);
  } catch (error) {
    console.error('Error fetching scent families:', error);
    res.status(500).json({ message: 'Error fetching scent families' });
  }
});

module.exports = router;