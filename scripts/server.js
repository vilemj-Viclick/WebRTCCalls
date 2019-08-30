const express = require('express');
const chalk = require('react-dev-utils/chalk');
const { registerOfferExchange } = require('./offerExchange.js');

module.exports = {
  setUpServer: ({ port, host }) => {
    const app = express();

    app.use(express.static('./dist/'));
    app.use(express.static('./public/'));
    registerOfferExchange(app);
    app.listen(port, host, err => {
      if (err) {
        return console.log(err);
      }

      // We used to support resolving modules according to `NODE_PATH`.
      // This now has been deprecated in favor of jsconfig/tsconfig.json
      // This lets you use absolute paths in imports inside large monorepos:
      if (process.env.NODE_PATH) {
        console.log(
          chalk.yellow(
            'Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.'
          )
        );
        console.log();
      }

      console.log(chalk.cyan('Starting the development server...\n'));
    });

    return app;
  },
};
