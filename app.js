const express = require('express');
const cookieParser = require('cookie-parser');
const routingMiddleware = require('./routingMiddleware');
const pricingRoute = require('./pricingRoutes');
const cors=require('cors');

const app = express();
app.set('trust proxy', true);
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(cookieParser());
app.use(routingMiddleware);
app.use('/', pricingRoute);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});