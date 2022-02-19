//Install express server
const express = require('express');
const path = require('path');

const app = express();
const cors = require("cors");
const Lexer = require("./helper/lexer");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Serve only the static files form the dist directory
app.use(express.static('./dist/halsted-calculator'));
app.get("/api", (req, res) => {
  res.send("Hello from Test Api.. coming soon");
});
app.post("/api", async (req, res) => {
  if (req.body.code) {
    let stream = req.body.code;
    let lexer = new Lexer(stream);
    await lexer.calculate(stream);
    let result = {
      operators: lexer.getOperators(),
      operands: lexer.getOperands()
    };
    res.status(200).send(result);
  } else {
    res.status(200).send("code is required !!!!");
  }
});
app.get('/*', (req, res) =>
  res.sendFile('index.html', {
    root: 'dist/halsted-calculator/'
  }),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
