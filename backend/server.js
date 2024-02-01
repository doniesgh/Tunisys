/*require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const traiteurRoutes = require('./routes/traiteur');
const recRoutes = require('./routes/reclamation');
const equiRoutes = require('./routes/equipement');
const notiRoutes = require('./routes/notification');
const interRoutes = require('./routes/intervention');
const clientRoutes = require('./routes/client');
const contractRoutes = require('./routes/contrat');
const serviceRoutes = require('./routes/service');
const ticketRoutes = require('./routes/ticket');

const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/inter', interRoutes);
// app.use('/api/rec', recRoutes);
app.use('/api/equi', equiRoutes);
app.use('/api/trait', traiteurRoutes);
app.use('/api/notification', notiRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/contrat', contractRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/tickets', ticketRoutes);


const server = app.listen(process.env.PORT, () => {
  console.log('listening for requests on port', process.env.PORT);
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.log(err);
  });
  server = require('http').createServer(app);   
  let io = require('./routes/sockets').init(server);

  io.sockets.on('connection', socket => {
    socket.on('subscribeToNotifications', data => {
      require('./routes/sockets/notificationHandler')(io, socket, data);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  
  require('./routes/utils/sendNotification');
  
   https
    .createServer(
      {
        key: fs.readFileSync('config/server.key'),
        cert: fs.readFileSync('config/server.crt')
      },
      app
    )
    .listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
   
  */
    require('dotenv').config();
    const express = require('express');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    const userRoutes = require('./routes/user');
    const traiteurRoutes = require('./routes/traiteur');
    const recRoutes = require('./routes/reclamation');
    const equiRoutes = require('./routes/equipement');
    const notiRoutes = require('./routes/notification');
    const interRoutes = require('./routes/intervention');
    const clientRoutes = require('./routes/client');
    const contractRoutes = require('./routes/contrat');
    const serviceRoutes = require('./routes/service');
    const ticketRoutes = require('./routes/ticket');
    
    const cors = require('cors');
    const app = express();
    
    app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }));
    
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    
    app.use((req, res, next) => {
      console.log(req.path, req.method);
      next();
    });
    
    app.use('/api/user', userRoutes);
    app.use('/api/inter', interRoutes);
    // app.use('/api/rec', recRoutes);
    app.use('/api/equi', equiRoutes);
    app.use('/api/trait', traiteurRoutes);
    app.use('/api/notification', notiRoutes);
    app.use('/api/client', clientRoutes);
    app.use('/api/contrat', contractRoutes);
    app.use('/api/service', serviceRoutes);
    app.use('/api/tickets', ticketRoutes);
    
    // Corrected server initialization
    const server = require('http').createServer(app);   
    const io = require('./routes/sockets').init(server);
    
    io.sockets.on('connection', socket => {
      socket.on('subscribeToNotifications', data => {
        require('./routes/sockets/notificationHandler')(io, socket, data);
      });
    
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
    
    require('./routes/utils/sendNotification');
    
    
    const httpPort = process.env.PORT || 3000;
    app.listen(httpPort, () => {
      console.log(`HTTP Server running on port ${httpPort}`);
    });
    
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Connected to the database');
      })
      .catch((err) => {
        console.error('Error connecting to the database:', err);
      });
    