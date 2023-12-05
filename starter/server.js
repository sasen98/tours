const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');

/// handle sync code
process.on('uncaughtException', (err) => {
  console.log('uncaught Exception');
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(process.env.DATABASE_CONNECT, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Db connection successful'));

const port = 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

/// to handle async code
process.on('unhandledRejection', (err) => {
  console.log('unhandled rejection');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
