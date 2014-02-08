/*global angular, _, $*/
'use strict';

angular.module('artshopApp')
  .controller('PieceCreateCtrl', function($scope, $upload, PieceService) {
    var emptyPiece = {
      title: '',
      media: '',
      dimensionX: 0,
      dimensionY: 0,
      year: '',
      pieceImg: '',
      fileUrl: ''
    },
    pieceDetails = $scope.pieceDetails = _.clone(emptyPiece);


    $scope.onFileSelect = function($files) {
      $('.uploading').removeClass('hidden');
      $files.forEach(function (file) {
        $scope.upload = $upload.upload({
          method: 'POST',
          url: '/api/file',
          file: file
        }).progress(function(evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total, 10));
        }).success(function(data) {
          $('.uploading').addClass('hidden');
          $('.complete').removeClass('hidden');
          setTimeout(function() {
            $('.complete').addClass('hidden');
          }, 2000);

          // file is uploaded successfully
          $scope.pieceDetails.fileUrl = data.fileUrl;
        });
      });
    };

    $scope.createPiece = function() {
      PieceService.add(pieceDetails).then(function() {
        pieceDetails = $scope.pieceDetails = _.clone(emptyPiece);
      },
      function(error) {
        console.log(error);
      });
    };

  });
