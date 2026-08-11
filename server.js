import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// 1. MySQL Connection Setup
const sequelize = new Sequelize(
  process.env.DB_NAME || 'nexus_commerce_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

// 2. Models Definition (Migrations equivalent)
const Product = sequelize.define('Product', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT },
  stockCount: { type: DataTypes.INTEGER },
  image: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING, defaultValue: 'Active' },
});

// 3. Database Sync & Seeder Function
const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connection has been established successfully.');

    // Sync models (This creates/updates the tables - Migration)
    await sequelize.sync({ force: false }); // force: true use karne se tables har bar delete ho kar naye bante hain
    console.log('Database tables synced.');

    // Seeder: Check if products exist, if not, add fake data
    const count = await Product.count();
    if (count === 0) {
      const initialData = [
        {
          id: 'prod-1',
          name: 'Noise Cancelling Pro Headphones',
          brand: 'Auraudio',
          category: 'Electronics',
          price: 249.99,
          stockCount: 142,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
          description: 'Industry-leading noise cancellation.',
        },
        {
          id: 'prod-2',
          name: 'Quantum Smartwatch Series 5',
          brand: 'NexusTech',
          category: 'Electronics',
          price: 199.00,
          stockCount: 65,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
          description: 'Track your health metrics in real-time.',
        }
      ];
      await Product.bulkCreate(initialData);
      console.log('Database seeded with initial products.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// 4. CRUD Operations (API Routes)

// GET All Products
app.get('/api/products', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// GET Single Product
app.get('/api/products/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
});

// CREATE Product
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = await Product.create({
      id: `prod-${Date.now()}`,
      ...req.body
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE Product
app.put('/api/products/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.update(req.body);
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// DELETE Product
app.delete('/api/products/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await initDb();
});
