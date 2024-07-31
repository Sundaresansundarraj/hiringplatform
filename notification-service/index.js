// require('dotenv').config();
// const express = require('express');
// const { startListening } = require('./services/notificationService');

// const app = express();
// app.use(express.json());


// app.listen(process.env.PORT, () => {
//   console.log(`Notification service running on port ${process.env.PORT}`);
//   startListening();
// });

require('dotenv').config();


const Hapi = require('@hapi/hapi');


const { startListening } = require('./services/notificationService');


const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT, // Use the port from .env file
    host: 'localhost'
  });

  

  
  await server.start();
  console.log(`Notification service running on port ${server.info.port}`);

  // Start listening to notifications
  startListening();
};

// Handle any errors and initiate the server
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();


