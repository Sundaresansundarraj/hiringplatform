require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const routes = require('./routes/postRoutes');
const db = require('./models/Post');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: 'localhost'
    });

    await server.register(Inert);

    server.route(routes);

    await db.sequelize.sync();

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();







