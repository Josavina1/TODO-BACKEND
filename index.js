const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigins = ['https://josavina1.github.io'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));app.use(express.json());

let items = [];
let idCounter = 1;

app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const { text } = req.body;
    const newItem = { id: idCounter++, text };
    items.push(newItem);
    console.log("New Item Added")
    res.status(201).json(newItem);
});

app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    items = items.filter(item => item.id !== id);
    console.log("Item Deleted")
    res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
