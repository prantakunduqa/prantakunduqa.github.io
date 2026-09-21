const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static assets from project root
app.use(express.static(__dirname));

// Single-page fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
