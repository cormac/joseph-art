'use strict';
var mongoose = require('mongoose'),
    AWS = require('aws-sdk'),
    fs = require('fs'),
    File = mongoose.model('File');

var writeUploadedFileToS3 = function(fileObject, next) {
  var s3Bucket = new AWS.S3({
        params: {
          Bucket: 'joesite',
        }
      }),
      s3Root = 'https://s3-eu-west-1.amazonaws.com/joesite/',
      fileReadStream = fs.createReadStream(fileObject.path);

  s3Bucket.putObject({
    Key: fileObject.name,
    Body: fileReadStream
  }, function(err, data) {
    if (err) next(err);
    else next(err, {fileUrl: s3Root + fileObject.name});
  });
};

// File Api
exports.postFile = function(req, res, next) {
  writeUploadedFileToS3(req.files.file, function(err, writtenFileObj) {
    if (err) next(err);
    else res.json(writtenFileObj);
  });
};

exports.piece = require('./piece');
exports.charge = require('./charge');
