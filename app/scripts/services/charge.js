/*global _, window */
angular.module('artshopApp.services')
  .factory('ChargeService', ['PieceService', '$resource',
    function(PieceService, $resource) {
      'use strict';
      var Charge = $resource('/api/charge'),

      messageTpl = _.template('Thanks for buying <%=title %>, I\'ll be in touch soon to organise' + 
                   ' shipping it out to you'),
      ChargeService = function() {
      };
      ChargeService.prototype.sendCharge = function(chargeDetails) {
        var charge = new Charge(chargeDetails);
        charge.$save(function(piece) {
          PieceService.setPieceAsSold(piece._id);
          window.alert(messageTpl({title: piece.title}));
        });
      };
      return new ChargeService();


    }
  ]);
