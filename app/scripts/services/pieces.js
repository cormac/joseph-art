/*global _*/
'use strict';
angular.module('artshopApp.services')
  .factory('PieceService', ['$resource', function($resource) {
 
  // get the restangular object for pieces
  var Piece = $resource('/api/piece/:pieceId',
    {pieceId: '@pieceId'},
    {
      update: { method: 'PUT' }
    }
  );

  var PieceService = function () {
    this.list = [];
    this.watchers = [];
    this.getList();
  };

  // add a piece to the list 
  // returns the promise
  PieceService.prototype.add = function(piece) {
    var newPiece = new Piece(piece);
    return newPiece.$save(function(piece) {
      this.updateList([piece].concat(this.list));
    }.bind(this));
  };

  PieceService.prototype.remove = function(pieceId) {
    var findPiece = function(piece) {
      return piece._id === pieceId;
    };
    var pieceToRemove = this.list.filter(findPiece)[0];
    

    pieceToRemove.$remove({'pieceId': pieceToRemove._id}, function() {
      this.updateList(_.reject(this.list, findPiece));
    }.bind(this));


  };

  PieceService.prototype.setPieceAsSold = function(pieceId) {
    var findPiece = function(piece) {
      return piece._id === pieceId;
    };
    var pieceToUpdate = this.list.filter(findPiece)[0];
    pieceToUpdate.sold = true;
    this.updateSubscribers();
  };


  PieceService.prototype.getList = function() {
    var pieces = Piece.query(function() {
      this.updateList(pieces);
    }.bind(this));

  };

  PieceService.prototype.updateList = function(list) {
    this.list = list;
    this.updateSubscribers();
  };

  PieceService.prototype.addToWatchers = function(watcherFn) {
    this.watchers.push(watcherFn);
  };

  PieceService.prototype.updateSubscribers = function() {
    this.watchers.forEach(function(watcherFn) {
      watcherFn(this.list);
    }, this);
  };

  return new PieceService();
}]);

