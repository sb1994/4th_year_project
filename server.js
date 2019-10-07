const express = require('express');
const bodyParser = require('body-parser');

const app = express();


const users = require('./api/v1/routes/users');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/api/users', users);



if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT,() => console.log(`Server running on port ${PORT}`));