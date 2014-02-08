'use strict';

angular.module('artshopApp')
  .controller('MainCtrl', ['$scope', 'PieceService', function ($scope, PieceService) {
      $scope.pieces = PieceService.list;
      var updateList = function(pieces) {
        $scope.pieces = pieces;
      };
      PieceService.addToWatchers(updateList);
    }
  ]);
