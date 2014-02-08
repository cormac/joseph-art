/*global $, StripeCheckout, Bootstrap*/
angular.module('artshopApp.directives')
.directive('stripe', ['ChargeService', function(ChargeService) {
  'use strict';
  return {
    restrict: 'A',
    link: function(scope, elem) {
      var imageId,
          description;
      var config = {
        key: Bootstrap.pk,
        image: '/images/joe_pattern.jpg',
        token: function(token, args) {
          ChargeService.sendCharge({
            token: token,
            id: imageId,
            args: args,
            description: description + ' - ' + imageId
          });
        }
      };
      var handler = StripeCheckout.configure(config);

      var openStripeHandler = function() {
        imageId = $(this).attr('id');
        description = $(this).parent().siblings('img').attr('alt');
        // Open Checkout with further options
        handler.open({
          name: 'Joeseph Coveney',
          description: description,
          amount: Bootstrap.price,
          shippingAddress: true,
          currency: 'EUR'
        });
      };

      $(elem).click(openStripeHandler);

    }
  };

}]);
