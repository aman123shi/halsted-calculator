//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/halsted-calculator'));
app.get("/api", (req, res) => {
  res.send("Hello from Test Api.. coming soon");
});
app.get('/*', (req, res) =>
  res.sendFile('index.html', {
    root: 'dist/halsted-calculator/'
  }),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
