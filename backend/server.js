import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads folder statically so images can be accessed publicly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());

await connectDB();

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);
app.use('/api/history', historyRoutes);

app.get('/', (req, res) => {
  res.send("Hello Promptoria");
});

app.listen(PORT, () => {
  console.log(`Server is working: ${PORT}`);
});
