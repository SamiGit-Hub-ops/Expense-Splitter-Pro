const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());
app.use(express.static('Public'));

app.get('/api/data', (req, res) => {
    if (!fs.existsSync(DATA_FILE)) return res.json({ users: [], expenses: [] });
    const data = fs.readFileSync(DATA_FILE);
    res.json(JSON.parse(data));
});

app.post('/api/save', (req, res) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.json({ message: "Saved successfully" });
});

app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));