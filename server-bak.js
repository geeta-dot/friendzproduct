const express = require("express");
const next = require("next");
const cors = require("cors");
const Razorpay = require ("razorpay")
const request = require('request');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

app.prepare().then(() => {
  const server = express();

  server.use(cors());
  server.all('*', function (req, res, next) {
    var origin = req.get('origin');
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  // server.get("/products/type/:type", (req, res) => {
  //   let query = req.query ? req.query : {};
  //   query.type = req.params.type;
  //   // console.log(query, req.params);

  //   return app.render(req, res, "/products", query);
  // });
  // server.get("/products/category/:slug", (req, res) => {
  //   return app.render(req, res, "/products", req.query);
  // });

  server.get("/order/:price/:reciept_id", (req, res) => {
    try {
      const options = {
        amount: req.params.price, // amount == Rs 10
        currency: "INR",
        receipt: req.params.reciept_id ,
        payment_capture: 0,
        // 1 for automatic capture // 0 for manual capture
      };
      instance.orders.create(options, async function (err, order) {
        if (err) {
          return res.status(200).json({
            message: "Something Went Wrong 3 here",
            err: err
          });
        }
        return res.status(200).json(order);
      });
    } catch (err) {
      return res.status(500).json({
        message: "Something Went Wrong 4",
        err: err
      });
    }
  });

  server.post("/capture/:paymentId/:price", (req, res) => {
    
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
        message: "Something Went Wrong 2" +err,
      });
    }
  });

  // server.get("/b", (req, res) => {
  //   return app.render(req, res, "/b", req.query);
  // });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
