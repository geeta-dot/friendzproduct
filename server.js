const app = require("express")();
const server = require("http").Server(app);
// const io = require('socket.io').listen(server)
const next = require("next");
const Razorpay = require("razorpay");
const request = require("request");
const serveStatic = require("serve-static");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const cors = require("cors");
const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});
// fake DB
// const messages = []

// socket.io server
// io.on('connection', socket => {
//     console.log('connected')
//     socket.on("sendmessage", data => {
//         console.log({ data });
//         // messages.push(data);
//         socket.broadcast.emit(data.user, data);
//     });
// })

nextApp.prepare().then(() => {
  // app.use(cors());
  app.use(function (req, res, next) {
    /*var err = new Error('Not Found');
   err.status = 404;
   next(err);*/

    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
    );

    //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Pass to next layer of middleware
    next();
  });
  // app.all('*', function (req, res, next) {
  //     c
  //     var origin = req.get('origin');
  //     res.header('Access-Control-Allow-Origin', origin);
  //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //     res.header('Access-Control-Allow-Headers', 'Content-Type');
  //     next();
  // });

  // app.get("/products/type/:type", (req, res) => {
  //   let query = req.query ? req.query : {};
  //   query.type = req.params.type;
  //   // console.log(query, req.params);

  //   return app.render(req, res, "/products", query);
  // });
  // app.get("/products/category/:slug", (req, res) => {
  //   return app.render(req, res, "/products", req.query);
  // });
//   app.use(
//     "/static",
//     server.static(__dirname + "/static", {
//       maxAge: "365d",
//     })
//   );
  app.get("/service-worker.js", (req, res) => {
    nextApp.serveStatic(req, res, "./.next/service-worker.js");
  });

  const serviceWorkers = [
    {
      filename: "service-worker.js",
      path: "./.next/service-worker.js",
    },
    {
      filename: "firebase-messaging-sw.js",
      path: "./public/static/firebase-messaging-sw.js",
    },
  ];

  serviceWorkers.forEach(({ filename, path }) => {
    app.get(`/${filename}`, (req, res) => {
      nextApp.serveStatic(req, res, path);
    });
  });

  app.get("/order/:price/:reciept_id", (req, res) => {
    try {
      const options = {
        amount: req.params.price, // amount == Rs 10
        currency: "INR",
        receipt: req.params.reciept_id,
        payment_capture: 0,
        // 1 for automatic capture // 0 for manual capture
      };
      instance.orders.create(options, async function (err, order) {
        if (err) {
          return res.status(200).json({
            message: "Something Went Wrong 3 here",
            err: err,
          });
        }
        return res.status(200).json(order);
      });
    } catch (err) {
      return res.status(500).json({
        message: "Something Went Wrong 4",
        err: err,
      });
    }
  });

  app.post("/capture/:paymentId/:price", (req, res) => {
    try {
      return request(
        {
          method: "POST",
          url: `https://${process.env.RAZOR_PAY_KEY_ID}:${process.env.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
          form: {
            amount: req.params.price, // amount == Rs 10 // Same As Order amount
            currency: "INR",
          },
        },
        async function (err, response, body) {
          // if (err) {
          //   return res.status(500).json({
          //     message: "Something Went Wrong 1",
          //   });
          // }

          return res.status(200).json(body);
        }
      );
    } catch (err) {
      return res.status(500).json({
        message: "Something Went Wrong 2" + err,
      });
    }
  });

  // app.get("/b", (req, res) => {
  //   return app.render(req, res, "/b", req.query);
  // });
  app.get("*", (req, res, next) => {
    // next();
    return nextHandler(req, res, next);
  });
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
