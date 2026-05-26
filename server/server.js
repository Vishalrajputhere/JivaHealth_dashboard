const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

// to connect the database properly on some systems we need ipv4 first
const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);
dns.setDefaultResultOrder('ipv4first');

connectDB();

const app = express();

app.use(express.json());

// allow requests from the client url (env var in production, localhost in dev)
let clientOrigin = 'http://localhost:5173';
if (process.env.CLIENT_URL) {
  try {
    // Clean up in case user pasted a URL with trailing slash or subpages (e.g. /users)
    clientOrigin = new URL(process.env.CLIENT_URL).origin;
  } catch (error) {
    clientOrigin = process.env.CLIENT_URL;
  }
}

app.use(
  cors({
    origin: clientOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);



// routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/family', require('./routes/familyMemberRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Jiva Health API is running' });
});

// error handler needs to be after all routes
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
