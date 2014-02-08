'use strict';

angular.module('artshopApp')
  .factory('Session',['$resource',
    function ($resource) {
      return $resource('/api/session/');
    }
  ]);
