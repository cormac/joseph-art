/*global angular */
'use strict';

angular.module('artshopApp')
  .controller('PiecePreviewListController', [
    '$scope', 'PieceService',
    function($scope, PieceService) {
      $scope.pieces = PieceService.list;

      var updateList = function(pieces) {
        $scope.pieces = pieces;
      };

      PieceService.addToWatchers(updateList);

    }
  ]);
