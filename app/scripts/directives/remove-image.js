/*global $*/
angular.module('artshopApp.directives')
.directive('removeImage', ['PieceService', function(PieceService) {
  'use strict';
  return {
    restrict: 'A',
    link: function(scope, elem) {
      var handleClick = function() {
        PieceService.remove($(this).parent().attr('id'), scope);
      };
      $(elem).click(handleClick);
    }
  };

}]);
