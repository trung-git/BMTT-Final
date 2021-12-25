const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

//Variable
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_CLOUD;
//MongoDB connection
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to DB!');
    app.listen(PORT, () => {
      console.log(`App is running in: http://localhost:${PORT}/`);
    });
  });
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  console.log(err);

  process.exit(1);
});
