const randomstring = require("randomstring");
const bodyParser = require('body-parser');

const offers = {};

module.exports = {
  registerOfferExchange: (app) => {
    app.use(bodyParser.json());

    app.get('/offer/:password', (req, res) => {
      const offer = offers[req.param.password];
      if (offer) {
        res.send(JSON.stringify(offer));
      }
      else {
        res.send(JSON.stringify({ message: 'No offer found for this password.' }));
        res.sendStatus(404);
      }
      res.end();
    });

    app.post('/offer', (req, res) => {
      const password = randomstring.generate(8);
      const offer = req.body;
      offers[password] = offer;

      res.send(JSON.stringify({ password }));
      res.end();
    });
  },
};
