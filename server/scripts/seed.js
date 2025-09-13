const mongoose = require('mongoose');
const Product = require('../models/Product');
const Review = require('../models/Review');
require('dotenv').config();

const products = [
  {
    name: "Chanel No. 5 Eau de Parfum",
    slug: "chanel-no-5-eau-de-parfum",
    description: "The legendary fragrance that revolutionized perfumery. A timeless composition of aldehydes, ylang-ylang, rose, lily of the valley, and iris over a warm, woody base of vetiver and sandalwood. Created by Ernest Beaux in 1921, this iconic scent embodies elegance and sophistication.",
    shortDescription: "The legendary fragrance with aldehydes, florals, and warm woody base notes.",
    price: 132,
    originalPrice: 150,
    images: [
      {
        url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500",
        alt: "Chanel No. 5 Eau de Parfum bottle"
      },
      {
        url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500",
        alt: "Chanel No. 5 product shot"
      }
    ],
    sizes: [
      { volume: "35ml", price: 132, inStock: true },
      { volume: "50ml", price: 165, inStock: true },
      { volume: "100ml", price: 220, inStock: false }
    ],
    scentFamily: "Floral",
    brand: "Chanel",
    featured: true,
    isNew: false,
    rating: 4.8,
    reviewCount: 0,
    inStock: true
  },
  {
    name: "Tom Ford Black Orchid",
    slug: "tom-ford-black-orchid",
    description: "A luxurious and sensual fragrance that captures the rich, dark facets of the orchid flower mixed with black truffle, ylang-ylang, bergamot, and effervescent citrus. The base features warm woods, vanilla, and balsam creating an intoxicating and mysterious scent.",
    shortDescription: "Luxurious orchid with black truffle, citrus, and warm vanilla base.",
    price: 145,
    images: [
      {
        url: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=500",
        alt: "Tom Ford Black Orchid bottle"
      }
    ],
    sizes: [
      { volume: "30ml", price: 145, inStock: true },
      { volume: "50ml", price: 195, inStock: true },
      { volume: "100ml", price: 285, inStock: true }
    ],
    scentFamily: "Oriental",
    brand: "Tom Ford",
    featured: true,
    isNew: false,
    rating: 4.6,
    reviewCount: 0,
    inStock: true
  },
  {
    name: "Dior Sauvage Eau de Toilette",
    slug: "dior-sauvage-eau-de-toilette",
    description: "A radically fresh composition that is both raw and noble. Calabrian bergamot brings a juicy freshness, while Sichuan pepper adds spicy notes. Ambroxan, derived from precious ambergris, unleashes a powerfully woody trail. A fragrance born from the desert in the magical hour of twilight.",
    shortDescription: "Fresh bergamot and spicy pepper with powerful woody ambroxan trail.",
    price: 98,
    images: [
      {
        url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500",
        alt: "Dior Sauvage bottle"
      }
    ],
    sizes: [
      { volume: "60ml", price: 98, inStock: true },
      { volume: "100ml", price: 125, inStock: true }
    ],
    scentFamily: "Fresh",
    brand: "Dior",
    featured: true,
    isNew: true,
    rating: 4.7,
    reviewCount: 0,
    inStock: true
  },
  {
    name: "Yves Saint Laurent Black Opium",
    slug: "ysl-black-opium",
    description: "The feminine answer to the iconic Opium fragrance. A seductive gourmand floral fragrance with coffee, vanilla, and white flowers. Pink pepper and orange blossom create the top notes, while jasmine and coffee form the heart, finished with vanilla, patchouli, and cedar.",
    shortDescription: "Seductive coffee and vanilla with jasmine and white flowers.",
    price: 110,
    originalPrice: 125,
    images: [
      {
        url: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500",
        alt: "YSL Black Opium bottle"
      }
    ],
    sizes: [
      { volume: "30ml", price: 110, inStock: true },
      { volume: "50ml", price: 140, inStock: true },
      { volume: "90ml", price: 180, inStock: true }
    ],
    scentFamily: "Oriental",
    brand: "Yves Saint Laurent",
    featured: true,
    isNew: false,
    rating: 4.5,
    reviewCount: 0,
    inStock: true
  },
  {
    name: "Creed Aventus",
    slug: "creed-aventus",
    description: "Inspired by the dramatic life of a historic emperor, this fragrance celebrates strength, power, and success. Handcrafted using traditional techniques, it features top notes of blackcurrant, bergamot, apple, and pineapple, with a heart of rose, dry birch, Moroccan jasmine, and patchouli.",
    shortDescription: "Powerful blend of blackcurrant, apple, rose, and birch for success.",
    price: 385,
    images: [
      {
        url: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=500",
        alt: "Creed Aventus bottle"
      }
    ],
    sizes: [
      { volume: "50ml", price: 385, inStock: true },
      { volume: "100ml", price: 485, inStock: false },
      { volume: "120ml", price: 545, inStock: true }
    ],
    scentFamily: "Woody",
    brand: "Creed",
    featured: false,
    isNew: false,
    rating: 4.9,
    reviewCount: 0,
    inStock: true
  },
  {
    name: "Hermès Terre d'Hermès",
    slug: "hermes-terre-d-hermes",
    description: "A symbolic narrative exploring raw material and its metamorphosis. A novel that expresses the alchemical power of the elements. A water somewhere between the earth and the sky. A journey imbued with strength and poetry. Woody, vegetal, mineral.",
    shortDescription: "Woody, vegetal, and mineral journey between earth and sky.",
    price: 125,
    images: [
      {
        url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500",
        alt: "Hermès Terre d'Hermès bottle"
      }
    ],
    sizes: [
      { volume: "50ml", price: 125, inStock: true },
      { volume: "100ml", price: 165, inStock: true }
    ],
    scentFamily: "Woody",
    brand: "Hermès",
    featured: false,
    isNew: false,
    rating: 4.4,
    reviewCount: 0,
    inStock: true
  }
];

const reviews = [
  {
    customerName: "Sarah Johnson",
    rating: 5,
    title: "Absolutely timeless!",
    comment: "Chanel No. 5 never goes out of style. The scent is sophisticated and elegant, perfect for special occasions. The longevity is excellent and I always receive compliments when wearing it.",
    verified: true,
    helpful: 12
  },
  {
    customerName: "Michael Chen",
    rating: 4,
    title: "Classic but pricey",
    comment: "Beautiful fragrance with incredible history. The aldehydes give it that distinctive sparkle. However, it is quite expensive for the size you get.",
    verified: true,
    helpful: 8
  },
  {
    customerName: "Emma Rodriguez",
    rating: 5,
    title: "My signature scent",
    comment: "I've been wearing this for years and it never disappoints. The floral notes are perfectly balanced and it works for both day and evening wear.",
    verified: false,
    helpful: 15
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/perfume-shop');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing data');

    // Insert products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Inserted ${insertedProducts.length} products`);

    // Insert reviews for the first product (Chanel No. 5)
    const chanelProduct = insertedProducts[0];
    const reviewsWithProductId = reviews.map(review => ({
      ...review,
      productId: chanelProduct._id
    }));

    await Review.insertMany(reviewsWithProductId);
    console.log(`Inserted ${reviewsWithProductId.length} reviews`);

    // Update product rating for Chanel No. 5
    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(chanelProduct._id, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();