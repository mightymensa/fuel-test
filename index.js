const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 80; // Use the provided port by Heroku or default to 3000

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'ui/dist')));

// Serve the app for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'ui/dist/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});