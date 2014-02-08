'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes

  // piece
  app.get('/api/piece', api.piece.pieces);
  app.get('/api/piece/:pieceId', api.piece.getPiece);
  //app.put('/api/piece/:pieceId', api.putPiece);
  app.post('/api/piece', api.piece.postPiece);
  app.delete('/api/piece/:pieceId', api.piece.deletePiece);


  // charge (stripe)
  app.post('/api/charge', api.charge.charge);
  // file
  app.post('/api/file', api.postFile);
  
  // users
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};
