const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api/courses', courseRoutes);


const port = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error) => {
  console.error('Error starting the server:', error);
  process.exit(1);
});