import express from 'express';
import bodyParser from 'body-parser';
import models from './models/index.js';
import GraphHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';

//import Schema from './graphql';
//import { typeDefs, resolvers } from './graphql/index.js';
import loaders from './graphql/loaders';
import Schema from './graphql'

var app = express();
var router = express.Router();

function startApp(port) {
  /*
  app.use('/graphql', GraphHTTP((request) => ({
          schema: Schema,
          context: { models: models, loaders },
          pretty: true,
          graphiql: true
  })));
  */
    app.listen(port, function() {
        console.log('Server is listening on port ' + port);
    });
}


if (!module.parent) {
  models.sequelize.sync()
      .then(function() {
          startApp(8088);
      })
      .catch(function (e) {
          throw new Error(e);
      });
}
/*
models.sequelize.sync()
    .then(function() {
        startApp(8088);
    })
    .catch(function (e) {
        throw new Error(e);
    });
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/graphql', GraphHTTP((request) => ({
        schema: Schema,
        context: { models: models, loaders },
        pretty: true,
        graphiql: true
})));

/*
 * This is here because of authentication. Auth middleware decodes the JWT token
 * and saves its content to request.user object.
 */

 /*
app.use('/graphql', GraphHTTP((request) => ({
        schema: Schema,
        context: { models: models },
        pretty: true,
        graphiql: true
})));
*/

module.exports = app;
//export default app;
