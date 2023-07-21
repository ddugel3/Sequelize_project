const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');

    return sequelize.sync({ force: false }); 
  })
  .then(() => {
    console.log('Models have been synchronized with the database.');

    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
