// logger.js
const logger = (req, res, next) => {
    // Start time of the request
    const start = Date.now();
  
    // Capture the original send method
    const originalSend = res.send;
  
    // Override the send method to log status code
    res.send = function (...args) {
      const elapsed = Date.now() - start;
      console.log(`${req.method} ${req.originalUrl} - ${res.statusCode}  - [${elapsed}ms]`);
      originalSend.apply(res, args);
    };
  
    next();
  };
  
  module.exports = logger;
  