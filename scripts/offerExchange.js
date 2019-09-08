const randomstring = require('randomstring');
const bodyParser = require('body-parser');
const SignalRJS = require('signalrjs');

const registerHub = (signalR, hubName) => {
  signalR.hub(hubName, {
    sendMessage: (senderId, messageType, data) => {
      console.log(`New message on hub '${hubName}' from sender '${senderId}'`);
      console.log('MessageType:' + messageType);
      console.log('Message data:' + JSON.stringify(data));
      console.log('Message END');
      console.log('');

      this.clients.all.invoke('receiveMessage').withArgs([senderId, messageType, data])
    },
  });
};

module.exports = {
  registerOfferExchange: (app) => {
    const signalR = new SignalRJS();

    app.use(bodyParser.json());
    app.use(signalR.createListener());

    app.post('/offer', (req, res) => {
      const password = randomstring.generate(8);
      registerHub(signalR, password);
      res.send(JSON.stringify({ password }));
      res.end();
    });
  },
};
