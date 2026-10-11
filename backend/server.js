const fs = require("fs");
const https = require("https");
const app = require("./app");

const PORT = process.env.PORT || 5000;

// run server depending on environment
const sslKeyPath = process.env.SSL_KEY_PATH || "/etc/letsencrypt/live/lfix.us/privkey.pem";
const sslCertPath = process.env.SSL_CERT_PATH || "/etc/letsencrypt/live/lfix.us/fullchain.pem";

if (process.env.NODE_ENV === "production" && fs.existsSync(sslKeyPath) && fs.existsSync(sslCertPath)) {
  https
    .createServer(
      {
        key: fs.readFileSync(sslKeyPath),
        cert: fs.readFileSync(sslCertPath),
      },
      app
    )
    .listen(PORT, () => {
      console.log(`Server is running on production HTTPS port ${PORT}`);
    });
} else {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
