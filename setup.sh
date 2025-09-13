#!/bin/bash

echo "🌟 Setting up Perfume Shop Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or higher) first."
    exit 1
fi

# Check if MongoDB is running (optional check)
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found locally. Make sure you have MongoDB installed or use MongoDB Atlas."
fi

echo "📦 Installing dependencies..."
npm run install-all

echo "📝 Setting up environment file..."
if [ ! -f server/.env ]; then
    cp server/.env.example server/.env
    echo "✅ Created server/.env file. Please update MongoDB connection if needed."
else
    echo "✅ Environment file already exists."
fi

echo "🌱 Seeding database with sample data..."
npm run seed

echo "🎉 Setup complete! You can now run the application with:"
echo "   npm run dev"
echo ""
echo "The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"