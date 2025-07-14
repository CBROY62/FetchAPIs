const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// ✅ MongoDB Atlas connection string
const uri = 'mongodb+srv://bhushan62:bhushan123@cluster0.vprxwxe.mongodb.net/usrdb?retryWrites=true&w=majority';

app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // serve index.html

// ✅ API endpoint to fetch 10 records
app.get('/api/data', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('usrdb');
    const collection = db.collection('data');
    const data = await collection.find().limit(10).toArray();
    res.json(data);
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
