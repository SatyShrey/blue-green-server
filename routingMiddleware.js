const config = require('./config.json');

function pickByPercentage() {
  const { percentageSplit } = config;
  const random = Math.random() * 100;
  return random < percentageSplit.blue ? 'blue' : 'green';
}

function routingMiddleware(req, res, next) {
  let chosen = null;
  let method = null;

  // 1. Header-based routing
  if (config.headerRouting && req.headers['x-version']) {
    const v = req.headers['x-version'];
    if (v === 'blue' || v === 'green') {
      chosen = v;
      method = 'header';
    }
  }

  // 2. Cookie-based sticky routing
  const cookieName = config.cookieName || 'pricing_version';
  if (!chosen && config.cookieRouting && req.cookies && req.cookies[cookieName]) {
    const c = req.cookies[cookieName];
    if (c === 'blue' || c === 'green') {
      chosen = c;
      method = 'cookie';
    }
  }

  // 3. IP-based routing
  if (!chosen && config.ipRouting) {
    const ip=req.ip;
    chosen= ip.includes('3') ? 'green' : "blue" ;
    method= 'ip';
  }

  // 4. Default
  if (!chosen) {
    chosen = pickByPercentage();
    method =config.strategy ? config.strategy : "default";
  }

  // Attach to req for route handler
  req.__chosenVersion = chosen;
  req.__routingMethod = method;

  // Set cookie if sticky routing and no cookie present
  if (config.cookieRouting && (!req.cookies || !req.cookies[cookieName])) {
    res.cookie(cookieName, chosen, { httpOnly: true, maxAge: 7 * 24 * 3600 * 1000 }); // 7 days
  }

  next();
}

module.exports = routingMiddleware;