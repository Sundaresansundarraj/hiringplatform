require('dotenv').config();
const Hapi = require('@hapi/hapi');
const sequelize = require('./config/database');
const applicationRoutes = require('./routes/applicationRoutes');
const Inert = require('@hapi/inert');


const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: 'localhost',
  });
  await server.register(Inert);
  // server.route([...applicationRoutes, {
  //   method: 'GET',
  //   path: '/uploads/{filename}',
  //   handler: {
  //     file: (request) => path.join(__dirname, 'uploads', request.params.filename),
  //   },
  // },]);

   server.route(applicationRoutes)

  

  // Start the server
  await server.start();
  console.log(`Server running on ${server.info.uri}`);

  // Connect to the database
  try {
    await sequelize.sync();
    console.log('Database connection established successfully');
  } catch (err) {
    console.error('Database connection error:', err);
  }

  try {
    await sequelize.authenticate();
    console.log('Database authentication successful');
  } catch (err) {
    console.error('Database authentication error:', err);
  }

};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();



