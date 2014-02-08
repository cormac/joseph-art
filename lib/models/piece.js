'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Piece Schema
 */
var PieceSchema = new Schema({
  title: String,
  description: String,
  dimensionX: Number,
  dimensionY: Number,
  media: String,
  year: Number,
  sold: Boolean,
  price: Number,
  fileUrl: String
});

/**
 * Validations
 */
PieceSchema.path('title').validate(function (title) {
  return title.length > 0;
}, 'You have to add a title');

PieceSchema.path('media').validate(function (media) {
  return media.length > 0;
}, 'You have to add a media type');

PieceSchema.path('dimensionX').validate(function (dimX) {
  return dimX > 0;
}, 'Add the width please');

PieceSchema.path('dimensionY').validate(function (dimY) {
  return dimY > 0;
}, 'Add the height please');

PieceSchema.path('year').validate(function (year) {
  return year < 2015 && year > 1995;
}, 'That\'s not a real year, is it now?');



mongoose.model('Piece', PieceSchema);
