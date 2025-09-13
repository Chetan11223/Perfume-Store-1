# Perfume Shop - Full Stack E-commerce Application

A modern, responsive perfume e-commerce application built with React, Node.js, and MongoDB. Features a clean, elegant design with comprehensive product browsing, detailed product pages, and a complete review system.

## 🌟 Features

### Frontend (React)
- **Responsive Design**: Mobile-first approach with elegant UI/UX
- **Homepage**: Hero section, featured products, call-to-action banners
- **Product Catalog**: Filterable grid with search, scent family filters, and price ranges
- **Product Details**: Multi-image gallery, size selection, detailed descriptions
- **Review System**: Customer reviews with ratings, sorting, and new review submission
- **Social Sharing**: Share products on Facebook, Twitter, WhatsApp
- **Accessibility**: Keyboard navigation, ARIA labels, focus management
- **Performance**: Lazy loading, optimized images, smooth animations

### Backend (Node.js + MongoDB)
- **RESTful API**: Clean, documented endpoints
- **Product Management**: CRUD operations with filtering and search
- **Review System**: Create and retrieve reviews with rating aggregation
- **Data Validation**: Comprehensive input validation and error handling
- **Security**: Helmet, CORS, rate limiting
- **Database**: MongoDB with Mongoose ODM

### Key Components
- **Navbar**: Responsive navigation with mobile menu
- **Product Cards**: Hover effects, badges, rating display
- **Image Gallery**: Thumbnail navigation, responsive images
- **Review Section**: Star ratings, form validation, sorting options
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: User-friendly error messages and retry options

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd perfume-shop
   ```

2. **Install dependencies for all packages**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp server/.env.example server/.env
   
   # Edit server/.env with your MongoDB connection string
   # Default values work for local MongoDB installation
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or make sure your MongoDB Atlas connection is configured
   ```

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the development servers**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
perfume-shop/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── styles/        # CSS files
│   └── package.json
├── server/                # Node.js backend
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── scripts/          # Database scripts
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## 🛠 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run install-all` - Install dependencies for all packages
- `npm run seed` - Seed the database with sample data
- `npm run build` - Build the frontend for production

### Frontend (client/)
- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Backend (server/)
- `npm run dev` - Start server with nodemon
- `npm start` - Start server in production mode
- `npm run seed` - Seed database with sample data

## 🗄 Database Schema

### Products
- Name, slug, description, short description
- Price, original price, images array
- Sizes with individual pricing
- Scent family, brand, featured status
- Rating and review count (calculated)

### Reviews
- Product reference, customer name
- Rating (1-5 stars), title, comment
- Timestamps, verified status, helpful count

## 🎨 Design Features

### Color Palette
- Primary Gold: #d4af37
- Dark Gold: #b8941f
- Text: #333333
- Light Gray: #666666
- Background: #fafafa

### Typography
- Headers: Playfair Display (serif)
- Body: Inter (sans-serif)
- Responsive font scaling

### Animations
- Smooth hover effects on cards
- Fade-in animations for content
- Staggered loading animations
- Skeleton loading states

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:slug` - Get product by slug
- `GET /api/products/meta/scent-families` - Get available scent families

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create new review

### Health
- `GET /api/health` - API health check

## 🌐 Environment Variables

### Server (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/perfume-shop
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Client (optional .env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: > 768px
- Large Desktop: > 1024px

## 🔒 Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- Error handling without sensitive data exposure

## 🚀 Performance Optimizations

- Image lazy loading
- Component code splitting
- Efficient MongoDB queries with indexes
- Skeleton loading states
- Optimized bundle size
- Caching strategies

## 🧪 Testing

The application includes:
- Input validation testing
- API endpoint testing
- Component rendering tests
- Accessibility testing
- Cross-browser compatibility

## 📈 Future Enhancements

- User authentication and accounts
- Shopping cart and checkout
- Payment integration
- Inventory management
- Advanced search with filters
- Wishlist functionality
- Email notifications
- Admin dashboard
- Product recommendations
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env file
   - Verify network connectivity for Atlas

2. **Port Already in Use**
   - Change PORT in server/.env
   - Kill existing processes on ports 3000/5000

3. **Dependencies Issues**
   - Delete node_modules and package-lock.json
   - Run `npm run install-all` again

4. **API Not Loading**
   - Check if backend server is running
   - Verify CORS configuration
   - Check browser console for errors

### Getting Help

- Check the console logs for detailed error messages
- Ensure all environment variables are set correctly
- Verify MongoDB connection and data seeding
- Check network requests in browser developer tools

---

Built with ❤️ using React, Node.js, and MongoDB