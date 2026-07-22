// Application startup file for cPanel / Passenger (Namecheap "Setup Node.js App").
//
// Passenger does not run `next start` — it boots this file directly and pipes
// requests to whatever server it creates. So this hands every request to the
// Next.js request handler.
//
// CommonJS on purpose: package.json has no "type": "module", and this file is
// not processed by the Next.js compiler, so it must be valid for the raw
// Node.js runtime.
//
// Requires a production build (`npm run build`) to exist in .next/ before boot.

const { createServer } = require("http");
const next = require("next");

// Passenger assigns PORT — sometimes a TCP port, sometimes a unix socket path.
// Don't parseInt it: a socket path must reach listen() as a string.
const port = process.env.PORT || 3000;

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res).catch((err) => {
        console.error("Error handling request:", req.url, err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      });
    }).listen(port, () => {
      console.log(`> Next.js ready on ${port}`);
    });
  })
  .catch((err) => {
    // Surfaced in the app's stderr.log, which is what cPanel shows on a 503.
    console.error("Failed to start Next.js:", err);
    process.exit(1);
  });
