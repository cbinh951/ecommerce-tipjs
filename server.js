const app = require('./app');

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`ecommerce start with PORT ${PORT}`);
});

// process.on('SIGINT', () => {
//   server.close(() => console.log('Exit server Express'));
// });
