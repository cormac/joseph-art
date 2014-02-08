'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * File Schema
 */
var FileSchema = new Schema({
  s3url: String
});

/**
 * Validations
 */
FileSchema.path('s3url').validate(function (s3url) {
  return s3url.length > 0;
}, 'Awesomeness must be between 1 and 10');

mongoose.model('File', FileSchema);
